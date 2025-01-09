import { useState } from "react";
import { AntCloudOutlined } from "@ant-design/icons";
import { ActionSheet, Card, Dialog, Toast } from "antd-mobile";
import { Action } from "antd-mobile/es/components/action-sheet";
import { ITransactionR } from "@/entities/transactionR";

type Props = {
  transaction: ITransactionR;
};

export function OperationsCard({ transaction }: Props) {
  const [visible, setVisible] = useState(false);
  const actions: Action[] = [
    { text: `${transaction.description}`, key: "copy" },
    { text: `${transaction.sum}`, key: "edit" },
    {
      text: `Удалить`,
      key: "delete",
      onClick: async () => {
        const result = await Dialog.confirm({
          content: "Что то делаем？",
          confirmText: "Да",
          cancelText: "Нет",
        });
        if (result) {
          setVisible(false);
          Toast.show("Готово");
        }
      },
    },
  ];

  return (
    <>
      <Card
        style={{ width: "90vw", height: "20vw" }}
        onClick={() => setVisible(true)}
        title={transaction.description}
        extra={<AntCloudOutlined style={{ color: "#1677ff" }} />}
      >
        {transaction.description}
        {transaction.sum}
      </Card>
      {/* <div style={{fontSize:''}}>
      {transaction.description}
      
    </div> */}

      <ActionSheet
        visible={visible}
        actions={actions}
        onClose={() => setVisible(false)}
      />
    </>
  );
}
