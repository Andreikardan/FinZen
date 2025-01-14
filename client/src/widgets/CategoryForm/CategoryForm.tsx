import { Form, Select, Input, Button } from 'antd';
import { useState } from 'react';
const { Option } = Select;

interface Props {
  budgets: { id: number; name: string }[];
  onAddCategory: (values: { name: string; category: number }) => void;
}

function CategoryForm({ budgets, onAddCategory }: Props) {
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handleFormChange = (changedFields: any[]) => {
    const errors = changedFields.some(({ errors }) => errors.length > 0);
    setIsButtonDisabled(errors);
  };

  const submit = async (values: { name: string; category: number }) => {
    onAddCategory(values);
  };

  return (
    <Form
      style={{ maxWidth: '273px', minWidth: '273px' }}
      onFinish={submit}
      onFieldsChange={(_, changedFields) => handleFormChange(changedFields)}
      initialValues={{ category: budgets[0]?.id || '' }}>

      <Form.Item
        name='name'
        required
        hasFeedback
        label="Введите название"
        rules={[{ required: true, message: 'Пожалуйста, укажите название' },{
            validator: async (_, value) => {
              if (!value) {
                return Promise.reject('Поле не может быть пустым');
              }
              return Promise.resolve();
            }}]}>
        <Input placeholder="название" />
      </Form.Item>

      <Form.Item
          name="category"
          label="Выберите счет"
          rules={[{ required: true, message: "Пожалуйста, выберите счет" }]}
        >
          <Select placeholder="Выберите счет">
            {budgets.map((budget) => (
              <Option key={budget.id} value={budget.id}>
                {budget.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
      <Button disabled={isButtonDisabled} style={{ minWidth: '100%' }} type="primary" htmlType="submit">
        Добавить
      </Button>
    </Form>
  );
}

export default CategoryForm;