import { useState } from 'react';
import { Form, Select, Input, Button, Modal, Row, Col, Image } from 'antd';

const { Option } = Select;

interface Props {
  icons: { icon: string }[]; // Массив иконок
  budgets: { id: number; name: string }[];
  onAddCategory: (values: { name: string; category: number; icon?: string }) => void;
}

function CategoryForm({ icons, budgets, onAddCategory }: Props) {
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const [form] = Form.useForm();

  const handleFormChange = (changedFields: any[]) => {
    const errors = changedFields.some(({ errors }) => errors.length > 0);
    setIsButtonDisabled(errors || !selectedIcon);
  };

  const handleIconSelect = (icon: string) => {
    setSelectedIcon(icon);
    setIsModalVisible(false);
    setIsButtonDisabled(false);
  };

  const submit = async (values: { name: string; category: number }) => {
    if (!selectedIcon) {
      return;
    }
    onAddCategory({ ...values, icon: selectedIcon });
    form.resetFields();
    setSelectedIcon(null);
    setIsButtonDisabled(true);
  };

  return (
    <>
      <Form
        form={form}
        style={{ maxWidth: '273px', minWidth: '273px' }}
        onFinish={submit}
        onFieldsChange={(_, changedFields) => handleFormChange(changedFields)}
        initialValues={{ category: budgets[0]?.id || '' }}
      >
        <Form.Item
          name="name"
          required
          hasFeedback
          label="Введите название"
          rules={[
            { required: true, message: 'Пожалуйста, укажите название' },
            {
              validator: async (_, value) => {
                if (!value) {
                  return Promise.reject('Поле не может быть пустым');
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <Input placeholder="название" />
        </Form.Item>

        <Form.Item
          name="category"
          label="Выберите счет"
          rules={[{ required: true, message: 'Пожалуйста, выберите счет' }]}
        >
          <Select placeholder="Выберите счет">
            {budgets.map((budget) => (
              <Option key={budget.id} value={budget.id}>
                {budget.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item>
          <Row justify="center" align="middle">
            <Col>
              <Button
                type="default"
                size="small"
                style={{
                  width: '32px',
                  height: '32px',
                  padding: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onClick={() => setIsModalVisible(true)}
              >
                {selectedIcon ? (
                  <Image
                    src={`${import.meta.env.VITE_IMAGES_API}${selectedIcon}`}
                    width={24}
                    height={24}
                    preview={false}
                  />
                ) : (
                  '+'
                )}
              </Button>
            </Col>
          </Row>
        </Form.Item>

        <Button
          disabled={isButtonDisabled}
          style={{ minWidth: '100%' }}
          type="primary"
          htmlType="submit"
        >
          Добавить категорию
        </Button>
      </Form>

      <Modal
        title="Выберите иконку"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Row gutter={[16, 16]}>
          {icons.map((iconObj) => (
            <Col key={iconObj.icon} span={4}>
              <Image
                src={`${import.meta.env.VITE_IMAGES_API}${iconObj.icon}`}
                width={32}
                height={32}
                preview={false}
                onClick={() => handleIconSelect(iconObj.icon)}
                style={{ cursor: 'pointer' }}
              />
            </Col>
          ))}
        </Row>
      </Modal>
    </>
  );
}

export default CategoryForm;