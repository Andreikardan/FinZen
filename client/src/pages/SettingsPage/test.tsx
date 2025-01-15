import { Col, Collapse, Image, message, Row } from "antd";
import { UserEdit } from "@/widgets";
import CategoryForm from "@/widgets/CategoryForm/CategoryForm";
import { useCategoryDList } from "@/entities/category";
import { useBudgetList } from "@/widgets/BudgetsList/useBudgetList";
import { signOutThunk } from "@/entities/user";
import { useAppDispatch } from "@/shared";
import EditCategoryDForm from '@/widgets/CategoryEdit/CategoryDCreate'
import { axiosInstance } from "@/shared/lib/axiosInstance";
import { useEffect, useState } from "react";
import { IApiResponseSuccess } from "@/shared/types";

const { Panel } = Collapse;

const CollapseComponent = () => {
  const dispatch = useAppDispatch();
  const { budgets } = useBudgetList();
  const { categoryD, createCategoryD, deleteCategoryD, updateCategoryD } = useCategoryDList();
  const [icons, setIcons] = useState<{icon: string;}[]| []>([])
  
  async function loadicons(){
    const icons = await axiosInstance.get<IApiResponseSuccess<{icon: string;}[]>>('/categoryd/icons')
    setIcons(icons.data.data)
  }
  useEffect(() => {
    loadicons()
  }, []);

  const handleAddCategory = async (values: { name: string; category: number; icon?: string }) => {
    try {
      await createCategoryD(values.name, values.icon || "", "", values.category);
      message.success("Категория добавлена");
    } catch (error) {
      message.error("Ошибка при добавлении категории");
    }
  };

  const signOutHandler = async (): Promise<void> => {
    try {
      await dispatch(signOutThunk());
      message.success("Вы успешно вышли из системы");
    } catch (error) {
      message.error("Ошибка при выходе из системы");
    }
  };

  const handleEditCategory = async (id: number, newName: string, budget_id: number) => {
    try {
      await updateCategoryD(id, newName, "", "", budget_id);
      message.success("Категория обновлена");
    } catch (error) {
      message.error("Ошибка при обновлении категории");
    }
  };

  const handleDeleteCategory = async (id: number) => {
    try {
      await deleteCategoryD(id);
      message.success("Категория удалена");
    } catch (error) {
      message.error("Ошибка при удалении категории");
    }
  };

  return (
    <Collapse accordion style={{ maxWidth: "340px", minWidth: "340px" }}>
      <Panel header="Редактировать личные данные" key="1">
        <UserEdit />
      </Panel>
      <Panel header="Редактирование категорий доходов" key="2">
        <Collapse accordion>
          <Panel header="Добавить категорию" key="add-category">
            {budgets.length > 0 ? (
              <CategoryForm icons={icons} budgets={budgets} onAddCategory={handleAddCategory} />
            ) : (
              <span>Сначала добавьте счет</span>
            )}
          </Panel>
          {categoryD.length > 0 ? (
            categoryD.map((category) => (<Panel header={ <Row justify="space-between" align="middle"><Col>{category.name}</Col><Col>{category.icon && ( <Image
                      src={`${import.meta.env.VITE_IMAGES_API}${category.icon}`}
                      width={24}
                      height={24}
                      preview={false}/>)}</Col> </Row>} key={category.id}>
                <EditCategoryDForm
                  category={category}
                  onEdit={handleEditCategory}
                  onDelete={handleDeleteCategory}
                />
              </Panel>
            ))
          ) : (
            <Panel
              key="no-categories"
              header={
                <div
                  onClick={(e) => e.stopPropagation()}
                  style={{ cursor: "default", textAlign: "center", fontWeight: "bold" }}
                >
                  У вас нет категорий
                </div>
              }
              showArrow={false}
            ></Panel>
          )}
        </Collapse>
      </Panel>
      <Panel
        key="3"
        header={
          <div
            onClick={(e) => {
              e.stopPropagation();
              signOutHandler();
            }}
            style={{
              cursor: "pointer",
              textAlign: "center",
              color: "white",
              fontWeight: "bold",
            }}
          >
            Выход
          </div>
        }
        showArrow={false}
        style={{ backgroundColor: "red", borderRadius: "0 0 8px 8px" }}
      ></Panel>
    </Collapse>
  );
};

export default CollapseComponent;