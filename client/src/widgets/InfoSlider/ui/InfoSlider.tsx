import { useEffect, useState } from "react";
import styles from "./InfoSlider.module.css";
import { Swiper, Toast } from "antd-mobile";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/reduxHooks";
import { getInfoSliderDataThunk } from "@/entities/infoSlider";
import { SkeletonSlider } from "./SkeletonSlider/SkeletonSlider"; 

export function InfoSlider() {
  const dispatch = useAppDispatch();
  const sliderDataArray = useAppSelector((state) => state.infoSlider.slider);
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getInfoSliderDataThunk()).unwrap(); 
      setTimeout(() => setIsLoading(false), 2000); 
    };
    fetchData();
  }, [dispatch]);

  const items = sliderDataArray.map((el, index) => (
    <Swiper.Item key={index}>
      <div
        className={styles.slideContainer}
        onClick={() => {
          Toast.show(`Вы нажали на карточку ${index + 1}`);
        }}
      >
        <div className={styles.slideTitle}>{el.title}</div>
        <div className={styles.slideText}>{el.text}</div>
        <img
          src={`http://localhost:3000/static/images/${el.img}`}
          alt={el.title}
          className={styles.slideImage}
        />
      </div>
    </Swiper.Item>
  ));

  return (
    <div>
      {isLoading ? (
        <SkeletonSlider />
      ) : (
        <Swiper loop autoplay>
          {items}
        </Swiper>
      )}
    </div>
  );
}