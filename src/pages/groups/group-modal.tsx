import { useEffect, useState } from "react";
import { Modal, Form, Input, DatePicker, Select } from "antd";
import dayjs from "dayjs";
import { GroupStatus, type GroupFormValues } from "@types";
import { courseService } from "../../services/course.service";
import type { Course } from "../../types/course";

const { Option } = Select;

interface GroupModalProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (values: GroupFormValues) => void;
  initialValues?: Partial<GroupFormValues>;
}

function GroupModal(props: GroupModalProps) {
  const { visible, onCancel, onSubmit, initialValues } = props;
  const [form] = Form.useForm();
  const [courses, setCourses] = useState<Course[]>([]);
  useEffect(() => {
    fetchCourses();
    if (visible) {
      form.setFieldsValue({
        ...initialValues,
        start_date: initialValues?.start_date
          ? dayjs(initialValues.start_date)
          : null,
        end_date: initialValues?.end_date
          ? dayjs(initialValues.end_date)
          : null,
      });
    }
  }, [visible, initialValues, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const formattedValues: GroupFormValues = {
        ...values,
        course_id: Number(values.course_id),
        start_date: values.start_date.format("YYYY-MM-DD"),
        end_date: values.end_date.format("YYYY-MM-DD"),
        status: values.status,
        name: values.name,
      };
      onSubmit(formattedValues);
      form.resetFields();
    } catch (err) {
      console.error("Validation error:", err);
    }
  };

  const fetchCourses = async () => {
    try {
      const res = await courseService.getCourses()
      setCourses(res?.data.courses ?? []);
    } catch (error) {
      console.error("Failed to fetch courses:", error);
    }
  };

  return (
    <Modal
      title={initialValues ? "Update Group" : "Create Group"}
      open={visible}
      onOk={handleOk}
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
      okText={initialValues ? "Update" : "Create"}
    >
      <Form layout="vertical" form={form}>
        <Form.Item
          name="name"
          label="Group Name"
          rules={[{ required: true, message: "Please enter group name" }]}
        >
          <Input />
        </Form.Item>

        {/* <Form.Item
          name="course_id"
          label="Course ID"
          rules={[
            { required: true, message: "Please enter course ID" },
            {
              type: "number",
              transform: (value) => Number(value),
              message: "Must be a number",
            },
          ]}
        >
          <Input type="number" placeholder="Masalan: 1" />
        </Form.Item> */}

        <Form.Item
          name="course_id"
          label="Course"
          rules={[{ required: true, message: "Please select a course" }]}
        >
          <Select placeholder="Select a course" allowClear>
            {courses.map((course) => (
              <Select.Option key={course.id} value={course.id}>
                {course.title}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="start_date"
          label="Start Date"
          rules={[{ required: true, message: "Please select a start date" }]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          name="end_date"
          label="End Date"
          dependencies={["start_date"]}
          rules={[
            { required: true, message: "Please select an end date" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                const startDate = getFieldValue("start_date");
                if (!value || !startDate || value.isAfter(startDate)) {
                  return Promise.resolve();
                }
                return Promise.reject({
                  message: "End date must be after start date",
                });
              },
            }),
          ]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          name="status"
          label="Status"
          rules={[{ required: true, message: "Please select a status" }]}
        >
          <Select placeholder="Select status">
            {Object.values(GroupStatus).map((status) => (
              <Option key={status} value={status}>
                {status.toUpperCase()}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default GroupModal;
