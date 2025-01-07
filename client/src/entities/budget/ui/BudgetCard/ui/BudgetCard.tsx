import React, { useRef } from "react";
import { Dialog, List, SwipeAction, Toast } from "antd-mobile";
import { SwipeActionRef } from "antd-mobile/es/components/swipe-action";
import { IBudget, IRawBudgetData } from "@/entities/budget/model/type";

type Props = {
  budget: IBudget;
  onDelete: ()=>void;
  onUpdate:(updatedBudget:IRawBudgetData) => void
};
export const BudgetCard: React.FC<Props> = React.memo(({ budget,onDelete, onUpdate}) => {
  const ref = useRef<SwipeActionRef>(null);

  return (
    <div>
      <List  >
        <SwipeAction
          ref={ref}
          closeOnAction={false}
          closeOnTouchOutside={false}
          rightActions={[
            {
              key: "delete",
              text: "Удалить",
              color: "danger",
              onClick: async () => {
                await Dialog.confirm({
                  content: "Будем удалять？",
                  confirmText: "Да",
                  onConfirm() {
                    onDelete()
                  },
                  cancelText: "Нет",
                });
                ref.current?.close();
              },
            },
          ]}
        >
          <List.Item
            onClick={() => {
              Toast.show(`${budget.id}`);
            }}
          >
            {budget.name}
            {budget.sum}
          </List.Item>
        </SwipeAction>
      </List>
    </div>
  );
});
