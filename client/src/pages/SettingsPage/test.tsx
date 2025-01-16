import { Col, Collapse, Image, Row } from "antd";
import { UserEdit } from "@/widgets";
import CategoryForm from "@/widgets/CategoryForm/CategoryForm";
import { useCategoryDList, useCategoryRList } from "@/entities/category";
import { useBudgetList } from "@/widgets/BudgetsList/useBudgetList";
import { signOutThunk } from "@/entities/user";
import { useAppDispatch } from "@/shared";
import EditCategoryDForm from '@/widgets/CategoryEdit/CategoryDCreate'
import EditCategoryRForm from '@/widgets/CategoryEdit/CategoryRCreate'
import { axiosInstance } from "@/shared/lib/axiosInstance";
import { useEffect, useState } from "react";
import { IApiResponseSuccess } from "@/shared/types";
import { Toast } from "antd-mobile";


const { Panel } = Collapse;

const CollapseComponent = () => {
  const dispatch = useAppDispatch();
  const { budgets } = useBudgetList();
  const { categoryD } = useCategoryDList();
  const { categoryR } = useCategoryRList();
  const [icons, setIcons] = useState<{icon: string;}[] | []>([]);
  
  async function loadicons() {
    const icons = await axiosInstance.get<IApiResponseSuccess<{icon: string;}[]>>('/categoryd/icons');
    setIcons(icons.data.data);
  }

  useEffect(() => {
    loadicons();
  }, []);

  const signOutHandler = async (): Promise<void> => {
    try {
      await dispatch(signOutThunk());
    } catch (error) {
      Toast.show({ content: 'Ошибка при выходе', position: "bottom" });
    }
  };

  return (
    <Collapse accordion style={{ padding: '0px', maxWidth: "340px", minWidth: "340px" }}>
      <Panel header="Выбрать бюджет для редактирования" key="2" style={{ backgroundColor: 'white' }}>
        {budgets.length > 0 ? (
          <Collapse accordion>
            {budgets.map((budget) => (
              <Panel
                key={budget.id}
                header={
                  <Row justify="center" align="middle" style={{ width: '100%' }}>
                    <Col>{budget.name}</Col>
                  </Row>
                }
              >
                <Collapse accordion>
                  <Panel header={`Редактировать категории доходов для бюджета ${budget.name}`} key={`edit-incomes-${budget.id}`}>
                    <Collapse accordion>
                      <Panel header={`Добавить категорию доходов для бюджета ${budget.name}`} key={`add-income-${budget.id}`}>
                        <CategoryForm
                          icons={icons}
                          budgetId={budget.id}
                          isIncome={true}
                        />
                      </Panel>
                      {categoryD
                        .filter((category) => category.budget_id === budget.id)
                        .map((category) => (
                          <Panel
                            key={category.id}
                            header={
                              <Row justify="space-between" align="middle">
                                <Col>{category.name}</Col>
                                <Col>
                                  {category.icon && (
                                    <Image
                                      src={`http://localhost:3000/static/images/${category.icon}`}
                                      width={24}
                                      height={24}
                                      preview={false}
                                    />
                                  )}
                                </Col>
                              </Row>
                            }
                          >
                            <EditCategoryRForm
                              category={category}
                              icons={icons}
                            />
                          </Panel>
                        ))}
                    </Collapse>
                  </Panel>
                  <Panel header={`Редактировать категории расходов для бюджета ${budget.name}`} key={`edit-expenses-${budget.id}`}>
                    <Collapse accordion>
                      <Panel header={`Добавить категорию расходов для бюджета ${budget.name}`} key={`add-expense-${budget.id}`}>
                        <CategoryForm
                          icons={icons}
                          budgetId={budget.id}
                          isIncome={false}
                        />
                      </Panel>
                      {categoryR
                        .filter((category) => category.budget_id === budget.id)
                        .map((category) => (
                          <Panel
                            key={category.id}
                            header={
                              <Row justify="space-between" align="middle">
                                <Col>{category.name}</Col>
                                <Col>
                                  {category.icon && (
                                    <Image
                                      src={`http://localhost:3000/static/images/${category.icon}`}
                                      width={24}
                                      height={24}
                                      preview={false}
                                    />
                                  )}
                                </Col>
                              </Row>
                            }
                          >
                            <EditCategoryDForm
                              category={category}
                              icons={icons}
                            />
                          </Panel>
                        ))}
                    </Collapse>
                  </Panel>
                </Collapse>
              </Panel>
            ))}
          </Collapse>
        ) : (
          <div>Нет доступных бюджетов</div>
        )}
      </Panel>
      <Panel header="Редактировать личные данные" key="1" style={{ backgroundColor: "white"}}>
        <UserEdit />
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