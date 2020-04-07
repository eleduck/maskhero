import React, { useEffect, useRef } from 'react';
import { getCityName, getCountryName } from "../../utils";

const Requesters = props => {

  const { filteredData } = props;

  const requesterWrapperRef = useRef(null);

  // For requesters' messages scrolling effect
  useEffect(() => {
    const requesterWrapper = requesterWrapperRef.current;

    const requesterScroll = () => {
      // When requester messages are scrolled to the end, the cycle will restart
      if (requesterWrapper.scrollTop >= 0.5 * requesterWrapper.scrollHeight) {
        requesterWrapper.scrollTop = 0;
      } else {
        // console.log(requesterWrapper.scrollTop, requesterWrapper.scrollHeight);
        requesterWrapper.scrollTop++;
      }
    };
    // Set a timer for the scrolling effect
    let r = setInterval(requesterScroll, 20);

    //When mouseover event is triggered, stop table from scrolling
    requesterWrapper.addEventListener(
      "mouseover",
      () => clearInterval(r),
      false
    );
    //When mouseout event is triggered, continue scrolling
    requesterWrapper.addEventListener(
      "mouseout",
      () => {
        r = setInterval(requesterScroll, 20);
      },
      false
    );
  }, []);

  return (
    <div className="row-2">
      <div className="w40">
        <p>
          凡华人组织和个人都可以通过这里申请口罩援助，我们会认真对待每一条申请。
        </p>
        <a
          className="btn"
          target="_blank"
          rel="noopener noreferrer"
          // href={JINSHUJU.FOREIGN_FORM_LINK}
          href={"https://jinshuju.net/f/sIDktA"}
          type="button"
        >
          申请援助
        </a>
      </div>
      <div ref={requesterWrapperRef} className="align-right w60">
        {/* Repeat the message list to make sure the infinite scrolling effect */}
        {filteredData.concat(filteredData).map((data) => (
          <div className="requester">
            <div className="content">{data["field_7"]}</div>
            <div className="requester-info">
              <p>{`${data["field_11"]}`}</p>
              <p>{`${getCountryName(data["field_13"])}-${getCityName(
                data["field_15"]
              )}`}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mb">
        <p>
          凡华人组织和个人都可以通过这里申请口罩援助，我们会认真对待每一条申请。
        </p>
        <a
          className="btn"
          target="_blank"
          rel="noopener noreferrer"
          // href={JINSHUJU.FOREIGN_FORM_LINK}
          href={"https://jinshuju.net/f/sIDktA"}
          type="button"
        >
          申请援助
        </a>
        <a
          className="btn-mb"
          target="_blank"
          rel="noopener noreferrer"
          // href={JINSHUJU.FOREIGN_FORM_LINK}
          href={"https://jinshuju.net/f/sIDktA"}
          type="button"
        >
          申请援助
        </a>
      </div>
    </div>
  )

};

export default Requesters;