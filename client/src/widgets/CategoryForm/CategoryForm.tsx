import { useState } from 'react';
import { Form, Input, Button, Row, Col, Image, Modal } from 'antd';
import { useCategoryDList, useCategoryRList } from '@/entities/category';
import { Toast } from 'antd-mobile';

interface Props {
  icons: { icon: string }[];
  budgetId: number;
  isIncome: boolean;
}

function CategoryForm({ icons, budgetId, isIncome }: Props) {
  const { createCategoryD } = useCategoryDList();
  const { createCategoryR } = useCategoryRList(); 
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

  const submit = async (values: { name: string }) => {
    if (!selectedIcon) {
      return;
    }
    try {
      if (isIncome) {
        await createCategoryD(values.name, selectedIcon, '', budgetId)
      } else {
        await createCategoryR(values.name, selectedIcon, '', budgetId);
      }
      Toast.show({ content: 'Категория добавлена', position: "bottom" });
      form.resetFields();
      setSelectedIcon(null);
      setIsButtonDisabled(true);
    } catch (error) {
      Toast.show({ content: 'Ошибка при добавлении категории', position: "bottom" });
    }
  };

  return (
    <>
      <Form
        form={form}
        onFinish={submit}
        onFieldsChange={(_, changedFields) => handleFormChange(changedFields)}
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
                    src={`http://localhost:3000/static/images/${selectedIcon}`}
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
                src={`http://localhost:3000/static/images/${iconObj.icon}`}
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