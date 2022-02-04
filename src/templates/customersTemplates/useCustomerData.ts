import { useCustomer } from "hooks";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import { CustomerRow } from "types";
import CakeIcon from "@mui/icons-material/Cake";
import AddBoxIcon from "@mui/icons-material/AddBox";
import EditIcon from "@mui/icons-material/Edit";
import PaymentIcon from "@mui/icons-material/Payment";
import KeyIcon from "@mui/icons-material/Key";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import EventNoteIcon from "@mui/icons-material/EventNote";
import BentoIcon from "@mui/icons-material/Bento";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";

export default function useCustomerData() {
  const { id } = useParams();
  const { data } = useCustomer(id);

  const birthDate = dayjs(data?.birthDate).format("MMM D, YYYY");
  const createdDate = dayjs(data?._createdDate).format(
    "ddd, MMM D, YYYY h:mm A"
  );
  const updatedDate = dayjs(data?._updatedDate).format(
    "ddd, MMM D, YYYY h:mm A"
  );
  const lateSat = dayjs(data?.lateSat).format("ddd, MMM D, YYYY h:mm A");

  const fullName = `${data?.firstName} ${data?.lastName}`;
  const fullAddress = `${data?.street}, ${data?.zipCode} ${data?.city}, ${data?.state}, ${data?.country}`;

  const dates: CustomerRow[] = [
    {
      Icon: CakeIcon,
      title: "Birth date",
      text: birthDate,
    },
    {
      Icon: AddBoxIcon,
      title: "Created date",
      text: createdDate,
    },
    {
      Icon: EditIcon,
      title: "Updated date",
      text: updatedDate,
    },
  ];

  const paymentMethod: CustomerRow[] = [
    {
      Icon: PaymentIcon,
      title: "Card type",
      text: data?.cardType,
    },
    {
      Icon: KeyIcon,
      title: "Last Four",
      text: data?.lastFour?.toString(),
    },
  ];

  const plan: CustomerRow[] = [
    {
      Icon: DriveFileRenameOutlineIcon,
      title: "Plan name",
      text: data?.planName,
    },
    {
      Icon: BentoIcon,
      title: "Portions #",
      text: data?.numPortions?.toString(),
    },
    {
      Icon: MenuBookIcon,
      title: "Recipes #",
      text: data?.numRecipes?.toString(),
    },
    {
      Icon: EventNoteIcon,
      title: "Late Sat",
      text: lateSat,
    },
    {
      Icon: WatchLaterIcon,
      title: "Late activation",
      text: String(data?.lateActivation),
    },
  ];

  return { fullName, fullAddress, dates, paymentMethod, plan };
}
