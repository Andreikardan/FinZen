import { useParams } from "react-router-dom";

export function ParamsTransactionPage():JSX.Element {
  const {id} = useParams()
  
  return (
    <div>
       страница транзакции
    </div>
  );
}

