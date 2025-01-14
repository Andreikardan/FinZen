import React from "react";
import { Form, Input, Select, Button, message } from "antd";
import { useBudgetList } from "@/widgets/BudgetsList/useBudgetList";

const { Option } = Select;

interface EditCategoryFormProps {
  category: {
    id: number;
    name: string;
    budget_id: number;
  };
  onEdit: (id: number, newName: string, budget_id: number) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
}

const EditCategoryDForm: React.FC<EditCategoryFormProps> = ({ category, onEdit, onDelete }) => {
  const { budgets } = useBudgetList();

  const onFinish = async (values: { name: string; budget_id: number }) => {
    try {
      await onEdit(category.id, values.name, values.budget_id);
      message.success("Категория обновлена");
    } catch (error) {
      message.error("Ошибка при обновлении категории");
    }
  };

  const handleDelete = async () => {
    try {
      await onDelete(category.id);
      message.success("Категория удалена");
    } catch (error) {
      message.error("Ошибка при удалении категории");
    }
  };

  return (
    <Form
      onFinish={onFinish}
      initialValues={{
        name: category.name,
        budget_id: category.budget_id,
      }}
    >
      <Form.Item
        label="Название категории"
        name="name"
        rules={[{ required: true, message: "Введите название категории" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Счет"
        name="budget_id"
        rules={[{ required: true, message: "Выберите счет" }]}
      >
        <Select>
          {budgets.map((budget) => (
            <Option key={budget.id} value={budget.id}>
              {budget.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Button type="primary" htmlType="submit">
        Сохранить
      </Button>
      <Button type="primary" danger onClick={handleDelete}>
        Удалить
      </Button>
    </Form>
  );
};

export default EditCategoryDForm;