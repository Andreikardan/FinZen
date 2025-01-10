import { OneBudgetTransactionsList } from "@/widgets/OneBudgetTransactionsList/ui/OneBudgetTransactionsList";
import { useParams } from "react-router-dom";

export function ParamsTransactionPage(): JSX.Element {
  const { id } = useParams();

  if (!id) {
    return <>111</>;
  }

  return <OneBudgetTransactionsList budgetId={+id} />;
}
