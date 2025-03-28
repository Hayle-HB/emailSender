import { HiOutlineUserAdd, HiOutlineUpload } from "react-icons/hi";

export const options = [
  {
    id: "manual",
    title: "Manual Entry",
    IconComponent: HiOutlineUserAdd,
    description: "Add recipients one by one manually",
    benefits: [
      "Perfect for small lists",
      "Direct control over each entry",
      "Edit as you go",
      "No file preparation needed",
    ],
  },
  {
    id: "csv",
    title: "CSV Upload",
    IconComponent: HiOutlineUpload,
    description: "Upload a CSV file with your recipient list",
    benefits: [
      "Ideal for large lists",
      "Bulk import in seconds",
      "Support for custom fields",
      "Excel/Spreadsheet compatible",
    ],
  },
];
