import React from 'react';
import { footerList1, footerList2, footerList3 } from '../utils/constants';

const List = ({ items, mt }: { items: string[]; mt: boolean }) => (
  <div className={`flex flex-wrap gap-2 ${mt && 'mt-5'} `}>
    {items.map((item) => (
      <p
        key={item}
        className="text-gray-400 text-sm hover:underline cursor-pointer"
      >
        {item}
      </p>
    ))}
  </div>
);

const Footer = () => {
  return (
    <div className="mt-6 hidden xl:block">
      <List items={footerList1} mt={false} />
      <List items={footerList2} mt />
      <List items={footerList3} mt />
      <p className="text-gray-400 text-sm mt-5 flex justify-center">
        2022 TikTik By&nbsp;
        <a
          href="https://www.linkedin.com/in/ibrahim-mowafy/"
          target="_blank"
          className="text-accent cursor-pointer pb-3"
          rel="noreferrer"
        >
          H.3M
        </a>
      </p>
    </div>
  );
};

export default Footer;
