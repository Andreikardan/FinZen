import { OneBudgetTransactionsList } from "@/widgets/OneBudgetTransactionsList/ui/OneBudgetTransactionsList";
import { useParams } from "react-router-dom";

export function ParamsTransactionPage():JSX.Element {
  const {id} = useParams()
  
  return (
  <OneBudgetTransactionsList budgetId={id}/>
  );
}

