import React, { useState } from "react";
import { Form, Input, Button, Row, Col, Image, Modal } from "antd";
import { useCategoryRList } from "@/entities/category"; // Импортируем хук для доходов
import { Toast } from "antd-mobile";

interface EditCategoryFormProps {
  category: {
    id: number;
    name: string;
    icon: string;
  };
  icons: { icon: string }[];
}

const EditCategoryRForm: React.FC<EditCategoryFormProps> = ({ category, icons }) => {
  const { updateCategoryR, deleteCategoryR } = useCategoryRList(); // Используем хук для доходов
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState<string>(category.icon);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [form] = Form.useForm();

  const handleIconSelect = (icon: string) => {
    setSelectedIcon(icon);
    setIsModalVisible(false);
    checkFormValidity();
  };

  const checkFormValidity = () => {
    const fields = form.getFieldsValue();
    const isNameEmpty = !fields.name || fields.name.trim() === "";
    setIsButtonDisabled(isNameEmpty);
  };

  const handleFormChange = () => {
    checkFormValidity();
  };

  const onFinish = async (values: { name: string }) => {
    try {
      await updateCategoryR(category.id, values.name, selectedIcon,);
      Toast.show({ content: 'Категория обновлена', position: "bottom" });
    } catch (error) {
      Toast.show({ content: 'Ошибка', position: "bottom" });
    }
  };

  const handleDelete = async () => {
    try {
      await deleteCategoryR(category.id); // Удаляем категорию доходов
      Toast.show({ content: 'Категория удалена', position: "bottom" });
    } catch (error) {
      Toast.show({ content: 'Ошибка ', position: "bottom" });
    }
  };

  return (
    <>
      <Form
        form={form}
        onFinish={onFinish}
        onFieldsChange={handleFormChange}
        initialValues={{
          name: category.name,
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
          name="icon"
          rules={[{ required: false, message: "Выберите иконку" }]}
        >
          <Row justify="center">
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
                <Image
                  src={`${import.meta.env.VITE_IMAGES_API}${selectedIcon}`}
                  width={24}
                  height={24}
                  preview={false}
                />
              </Button>
            </Col>
          </Row>
        </Form.Item>
        <Button type="primary" htmlType="submit" disabled={isButtonDisabled} style={{ minWidth: '100%' }}>
          Сохранить
        </Button>
        <Button type="primary" danger onClick={handleDelete} style={{ minWidth: '100%', marginTop: '8px' }}>
          Удалить
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
};

export default EditCategoryRForm;