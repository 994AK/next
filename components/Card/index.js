/*
 *  bgColor 颜色
 *  title 主题
 *  icon 切换icon
 * */

import {
  CheckOutlined,
  ArrowRightOutlined,
  CloseOutlined,
  ExclamationOutlined,
} from '@ant-design/icons';

export const Card = ({ bgColor = 'card-blue', title, icon, handleClickPage }) => {
  return (
    <div
      className={`
            w-5/6 md:w-1/3
            h-40
            m-5
            rounded
            cursor-pointer
            transition duration-150 ease-in-out
            hover:shadow-md
            hover:scale-105
            ${bgColor}
          `}
      onClick={handleClickPage}
    >
      <div className="flex justify-end pt-2 pr-3">
        <span className="text-white">
          <CloseOutlined />
        </span>
      </div>
      <div className="flex justify-start">
        <span className="text-2xl text-white pl-5">
          {icon === 'CheckOutlined' ? <CheckOutlined /> : <ExclamationOutlined />}
        </span>
      </div>
      <div className="flex justify-start">
        <span className="text-xl text-white pt-3 pl-6">{title}</span>
      </div>
      <div className="flex justify-start">
        <div className="flex items-end">
          <span className="text-neutral-200 pt-3 pl-6">前往</span>
          <div className="flex items-end pb-1 pl-1 text-neutral-200">
            <ArrowRightOutlined />
          </div>
        </div>
      </div>
    </div>
  );
};
