import { type Group, type Room } from "@types";
import type { TableProps } from "antd";

export const GroupColumns: TableProps<Group>["columns"] = [
  {
    title: "Group",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Course",
    dataIndex: "course",
    key: "course",
    render: (course: { title: string }) => <span>{course.title}</span>,
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "Start Date",
    dataIndex: "start_date",
    key: "start_date",
  },
  {
    title: "End Date",
    dataIndex: "end_date",
    key: "end_date",
  },
];

export const RoomColumns: TableProps<Room>["columns"] = [
  {
    title: "Branches",
    dataIndex: "branchId",
    key: "branchId",
    render: (branch: { name: string }) => <span>{branch?.name}</span>,
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Capacity",
    dataIndex: "capacity",
    key: "capacity",
  },
];
