import { useEffect, useState } from "react";
import type { Course, CourseFormValues } from "@types";
import { Table, Button, Popconfirm, Space } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import { courseService } from "@services";
import { Notification } from "@helpers";
import CourseModal from "./course-modal";

function Course() {
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);
  const [editingGroup, setEditingGroup] = useState<Course | null>(null);
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 5,
    total: 0,
  });

  const fetchCourses = async (page: number, pageSize: number) => {
    setLoading(true);
    try {
      const response = await courseService.getCourses();
      const data = response?.data?.data || [];
      setCourses(data);
      setPagination({
        ...pagination,
        current: page,
        pageSize,
        total: data.length,
      });
    } catch (err) {
      Notification("error", "Course yuklashda xatolik yuz berdi");
    }
    setLoading(false);
  };

  const handleEdit = (course: Course) => {
    setEditingGroup(course);
    setModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await courseService.deleteGroup(id);
      Notification("success", "Guruh o'chirildi");
      fetchCourses(pagination.current!, pagination.pageSize!);
    } catch (err) {
      Notification("error", "Guruhni o'chirishda xatolik yuz berdi");
    }
  };

  const handleCreateOrUpdate = async (values: CourseFormValues) => {
    try {
      if (editingGroup) {
        await courseService.updateCourse(values, editingGroup.id);
        Notification("success", "Course muvaffaqiyatli yangilandi");
      } else {
        await courseService.createCourse(values);
        Notification("success", "Course muvaffaqiyatli qo'shildi");
      }
      setModalOpen(false);
      setEditingGroup(null);
      fetchCourses(pagination.current!, pagination.pageSize!);
    } catch (err) {
      Notification("error", "Amalni bajarishda xatolik yuz berdi");
    }
  };

  useEffect(() => {
    fetchCourses(pagination.current!, pagination.pageSize!);
  }, []);

  const handleTableChange = (pagination: TablePaginationConfig) => {
    fetchCourses(pagination.current!, pagination.pageSize!);
  };

  const columns: ColumnsType<Course> = [
    {
      title: "Nomi",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Narxi",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
    },
    {
      title: "Bir haftada nechi martda?",
      dataIndex: "lessons_in_a_week",
      key: "lessons_in_a_week",
    },
    {
      title: "Dars davomiligi",
      dataIndex: "lesson_duration",
      key: "lesson_duration",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            className="bg-blue-200"
            type="link"
            onClick={() => handleEdit(record)}
          >
            Edit
          </Button>
          <Popconfirm
            title="Ishonchingiz komilmi?"
            okText="Ha"
            cancelText="Yo'q"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button className="bg-red-200" type="link" danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-4 bg-white rounded-xl shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Guruhlar ro'yxati</h2>
        <Button
          type="primary"
          onClick={() => {
            setEditingGroup(null);
            setModalOpen(true);
          }}
        >
          Curs qo'shish
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={courses}
        loading={loading}
        rowKey={(record) => record.id}
        pagination={pagination}
        onChange={handleTableChange}
        bordered
      />

      <CourseModal
        visible={modalOpen}
        onCancel={() => {
          setModalOpen(false);
          setEditingGroup(null);
        }}
        onSubmit={handleCreateOrUpdate}
        initialValues={editingGroup || undefined}
      />
    </div>
  );
}

export default Course;
