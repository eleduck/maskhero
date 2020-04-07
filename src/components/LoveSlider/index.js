/**
 * 爱的留声机组件
 *  */
import React, { Fragment, useState, useEffect } from 'react'
import * as request from '../../request'

// 轮播插件
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// 预览插件
import Carousel, { Modal, ModalGateway } from "react-images";



export default function LoveSlider() {
    const [highlightData, setHighLightData] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);

    useEffect(() => {
        // 获取留声机
        request.getHighLightData()
            .then((response) => {
                let { data } = response;
                data = data.filter((d) => d["field_12"] === "已审核");
                setHighLightData(data);
            })
            .catch((error) => console.log(error));
    }, [])


    const toggleModal = (index) => {
        setModalIsOpen(!modalIsOpen);
        setSelectedIndex(index);
    };

    const delta = 6;
    let startX;
    let startY;
    let drag = false;
    const handleTouchStart = (event) => {
        drag = false;
        startX = event.pageX;
        startY = event.pageY;
    };

    const handleTouchMove = (event) => {
        drag = true;
    };

    const handleTouchEnd = (event, index) => {
        const diffX = Math.abs(event.pageX - startX);
        const diffY = Math.abs(event.pageY - startY);
        if (diffX < delta && diffY < delta) {
            toggleModal(index);
        }
    };

    const carouselSettings = {
        dots: true,
        infinite: true,
        initialSlide: 0,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
    };


    const hightlightList = [];
    let imagesTemp = [];
    highlightData.forEach((data, index) => {
        if (index % 4 === 0) {
            imagesTemp = [
                <img style={{ opacity: 0 }} src="" alt="empty" />,
                <img style={{ opacity: 0 }} src="" alt="empty" />,
                <img style={{ opacity: 0 }} src="" alt="empty" />,
                <img style={{ opacity: 0 }} src="" alt="empty" />,
            ];
        }
        imagesTemp[index % 4] = (
            <div
                style={{
                    backgroundImage: `url(${data["field_11"][0]})`,
                    // width: "18vw",
                    // height: "18vw",
                    backgroundSize: "cover",
                }}
                className="carousel-img"
                src={data["field_11"][0]}
                alt="empty"
                onTouchStart={handleTouchStart}
                onMouseDown={handleTouchStart}
                onTouchMove={handleTouchMove}
                onMouseMove={handleTouchMove}
                onTouchEnd={(e) => {
                    handleTouchEnd(e, index);
                }}
                onMouseUp={(e) => {
                    handleTouchEnd(e, index);
                }}
            ></div>
        );
        if (index % 4 === 3 || index === highlightData.length - 1) {
            hightlightList.unshift(
                <div key={`hl-${index}`} className="carousel-images">
                    {imagesTemp}
                </div>
            );
        }
    });

    const imageCa = highlightData.map((h) => {
        return { source: h["field_11"][0] };
    });



    return <Fragment>
        <p className="text">这里，是我们随手记录的一些真实瞬间。</p>
        <Slider className="carousel-dt" {...carouselSettings}>
            {hightlightList}
        </Slider>
        <Slider className="carousel-mb" {...carouselSettings}>
            {highlightData.map((data, index) => (
                <div className="carousel-images">
                    <div
                        style={{
                            backgroundImage: `url(${data["field_11"][0]})`,
                            // width: "18vw",
                            // height: "18vw",
                            backgroundSize: "cover",
                        }}
                        className="carousel-img"
                        src={data["field_11"][0]}
                        alt="empty"
                        onTouchStart={handleTouchStart}
                        onMouseDown={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onMouseMove={handleTouchMove}
                        onTouchEnd={(e) => {
                            handleTouchEnd(e, index);
                        }}
                        onMouseUp={(e) => {
                            handleTouchEnd(e, index);
                        }}
                    ></div>
                </div>
            ))}
        </Slider>
        <ModalGateway>
            {modalIsOpen ? (
                <Modal onClose={toggleModal}>
                    <Carousel currentIndex={selectedIndex} views={imageCa} />
                </Modal>
            ) : null}
        </ModalGateway>
    </Fragment>
}