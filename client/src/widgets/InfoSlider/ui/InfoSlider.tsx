import { useEffect, useState } from "react";
import styles from "./InfoSlider.module.css";
import { Swiper } from "antd-mobile";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/reduxHooks";
import { getInfoSliderDataThunk } from "@/entities/infoSlider";
import { SkeletonSlider } from "./SkeletonSlider/SkeletonSlider";

export function InfoSlider() {
  const dispatch = useAppDispatch();
  const sliderDataArray = useAppSelector((state) => state.infoSlider.slider);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getInfoSliderDataThunk()).unwrap();
      } catch (error) {
        console.error("Ошибка при загрузке данных слайдера:", error);
      } finally {
        setIsLoading(false); 
      }
    };
    fetchData();
  }, [dispatch]);

  if (isLoading) {
    return <SkeletonSlider />;
  }

  
  if (sliderDataArray.length === 0) {
    return <div className={styles.emptyMessage}>Данные отсутствуют</div>;
  }

  
  const items = sliderDataArray.map((el, index) => (
    <Swiper.Item key={index}>
      <div
        className={styles.slideContainer}
        
      >
        <div className={styles.slideTitle}>{el.title}</div>
        <div className={styles.slideText}>{el.text}</div>
        <img
          src={`${import.meta.env.VITE_IMAGES_API}${el.img}`}
          alt={el.title}
          className={styles.slideImage}
        />
      </div>
    </Swiper.Item>
  ));

  return (
    <div>
      <Swiper loop autoplay>
        {items}
      </Swiper>
    </div>
  );
}