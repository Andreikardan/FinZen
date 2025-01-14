import { Collapse, message } from "antd";
import { UserEdit } from "@/widgets";
import CategoryForm from "@/widgets/CategoryForm/CategoryForm";
import { useCategoryDList } from "@/entities/category";
import { useBudgetList } from "@/widgets/BudgetsList/useBudgetList";
import { signOutThunk } from "@/entities/user";
import { useAppDispatch } from "@/shared";
import EditCategoryDForm from '@/widgets/CategoryEdit/CategoryDCreate'

const { Panel } = Collapse;

const CollapseComponent = () => {
  const dispatch = useAppDispatch();
  const { budgets } = useBudgetList();
  const { categoryD, createCategoryD, deleteCategoryD, updateCategoryD } = useCategoryDList();

  const handleAddCategory = async (values: { name: string; category: number }) => {
    try {
      await createCategoryD(values.name, "", "", values.category);
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
    <Collapse style={{ maxWidth: "340px", minWidth: "340px" }}>
      <Panel header="Редактировать личные данные" key="1">
        <UserEdit />
      </Panel>
      <Panel header="Редактирование категорий доходов" key="2">
        <Collapse>
          <Panel header="Добавить категорию" key="add-category">
            {budgets.length > 0 ? (
              <CategoryForm budgets={budgets} onAddCategory={handleAddCategory} />
            ) : (
              <span>Сначала добавьте счет</span>
            )}
          </Panel>
          {categoryD.length > 0 ? (
            categoryD.map((category) => (
              <Panel header={category.name} key={category.id}>
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