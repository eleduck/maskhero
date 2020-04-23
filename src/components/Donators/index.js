import React, { useEffect, useRef } from 'react';
import moment from "moment";

const Donators = props => {

  const { domesticData, donatorData } = props;

  const donatorWrapperRef = useRef(null);
  const donatorTableRef = useRef(null);

  useEffect(() => {
    const donatorWrapper = donatorWrapperRef.current;
    const donatorTable = donatorTableRef.current;

    const donatorScroll = () => {
      // When donator list is scrolled to the end, the cycle will restart
      if (donatorWrapper.scrollTop >= 0.5 * donatorTable.scrollHeight) {
        donatorWrapper.scrollTop = 0;
      } else {
        // console.log(donatorWrapper.scrollTop, donatorTable.scrollHeight);
        donatorWrapper.scrollTop++;
      }
    };

    // Set a timer for the scrolling effect
    let d = setInterval(donatorScroll, 25);

    //When mouseover event is triggered, stop table from scrolling
    donatorWrapper.addEventListener(
      "mouseover",
      () => clearInterval(d), false);
    //When mouseout event is triggered, continue scrolling
    donatorWrapper.addEventListener(
      "mouseout",
      () => {
        d = setInterval(donatorScroll, 25);
      },
      false
    );
  }, []);

  const list = [];
  donatorData.forEach((data) => {
    list.push({
      name: data["field_1"],
      avatar: data["x_field_weixin_headimgurl"].replace("http", "https"),
      content: `捐赠了 ${data["field_12"]} 人民币`,
      createdAt: data["created_at"],
    });
  });

  domesticData.forEach((data) => {
    list.push({
      name: data["field_1"],
      avatar: data["x_field_weixin_headimgurl"].replace("http", "https"),
      content: `捐赠了 ${data["field_5"][0]} ${data["field_10"]} 个`,
      createdAt: data["created_at"],
    });
  });

  list.sort(function (a, b) {
    a = new Date(a.createdAt);
    b = new Date(b.createdAt);
    return a > b ? -1 : a < b ? 1 : 0;
  });

  // console.log(list);

  return (
    <div className="row-1 module-space">
      <a
        className="btn-mb"
        rel="noopener noreferrer"
        href="#helpus"
        type="button"
      >
        提供援助
      </a>
      <div ref={donatorWrapperRef} className="w60">
        <table ref={donatorTableRef} className="info-table">
          <tbody>
          {/* Repeat the list to make sure the infinite scrolling effect */}
          {list.concat(list).map((data, index) => (
            <tr key={`donator-${index}`}>
              <td className="show-name-avatar">
                <img className="table-avatar" src={data.avatar} alt={data.name} />
                <span>{data.name}</span>
              </td>
              <td>{data.content}</td>
              <td>{moment(data.createdAt).format("YYYY年MM月DD日")}</td>
              {/* <td>{data.createdAt}</td> */}
            </tr>
          ))}
          </tbody>
        </table>
      </div>

      <div className="w40 dt support-column">
        <p>我们目前急需口罩和采购口罩的资金。多少不限，请勿坐视。</p>
        <a
          className="btn"
          rel="noopener noreferrer"
          href="#helpus"
          type="button"
        >
          提供援助
        </a>
      </div>
    </div>
  )

};

export default Donators;