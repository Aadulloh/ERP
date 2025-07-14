import { Button, Space, Table, type TablePaginationConfig } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useGroup, useGeneral } from "@hooks";
import { PopConfirm } from "@components";
import { type Group } from "@types";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import GroupModal from "./modal";

const Groups = () => {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"create" | "update">("create");
  const [update, setUpdate] = useState<Group | null>(null);
  const [params, setParams] = useState({
    page: 1,
    limit: 10,
  });

  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const page = searchParams.get("page");
    const limit = searchParams.get("limit");
    if (page && limit) {
      setParams(() => ({
        page: Number(page),
        limit: Number(limit),
      }));
    }
  }, [location.search]);

  const { data, useGroupDelete } = useGroup(params);
  const { handlePagination } = useGeneral();
  const { mutate: deleteFn, isPending: isDeleting } = useGroupDelete();

  const deleteItem = (id: number) => {
    deleteFn(id);
  };

  const editItem = (record: Group) => {
    setUpdate(record);
    setMode("update");
    setOpen(true);
  };

  const toggle = () => {
    setOpen(!open);
    setMode("create");
    setUpdate(null);
  };
  const handleTableChange = (pagination: TablePaginationConfig) => {
    handlePagination({ pagination, setParams });
  };

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Status", dataIndex: "status", key: "status" },
    { title: "Course ID", dataIndex: "course_id", key: "course_id" },
    { title: "Start Date", dataIndex: "start_date", key: "start_date" },
    { title: "End Date", dataIndex: "end_date", key: "end_date" },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: Group) => (
        <Space size="middle">
          <Button type="primary" onClick={() => editItem(record)}>
            <EditOutlined />
          </Button>
          <PopConfirm
            handleDelete={() => deleteItem(record.id!)}
            loading={isDeleting}
          />
        </Space>
      ),
    },
  ];

  return (
    <>
      {open && (
        <GroupModal open={open} toggle={toggle} update={update} mode={mode} />
      )}
      <h1>GROUPS</h1>
      <Button type="primary" onClick={() => setOpen(true)}>
        add group
      </Button>
      <Table<Group>
        columns={columns}
        dataSource={data?.data?.data}
        rowKey={(row) => row.id}
        pagination={{
          current: params.page,
          pageSize: params.limit,
          total: data?.data?.total,
          showSizeChanger: true,
          pageSizeOptions: ["4", "5", "6", "7", "10"],
        }}
        onChange={handleTableChange}
      />
    </>
  );
};

export default Groups;
