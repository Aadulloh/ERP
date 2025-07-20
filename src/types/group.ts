export interface Group {
  id?: number;
  name: string;
  course_id: number;
  status: string;
  start_date: string;
  end_date: string;
}

export interface GroupModalProps {
  open: boolean;
  toggle: () => void;
  update: Group | null;
  mode: "create" | "update";
}