import { TransactionList } from "@/widgets/TransactionList";
import { useParams } from "react-router-dom";

export function ParamsTransactionPage():JSX.Element {
  const {id} = useParams()
  console.log(id,444);
  
  return (
  <TransactionList/>
  );
}

