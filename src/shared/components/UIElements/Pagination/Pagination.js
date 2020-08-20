import React from "react";
import { motion } from "framer-motion";

import Button from "../../FormElements/Button/Button";
import "./Pagination.css";

const Pagination = ({ productsPerPage, totalPtoducts, paginate, currPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPtoducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <motion.div
      className="pagination"
      initial={{ x: "100vw" }}
      animate={{ x: 0 }}
      transition={{ delay: 0.5, duration: 1, stiffness: 80, type: "spring" }}
    >
      <ul>
        {pageNumbers.map((number) => (
          <li key={number}>
            <Button
              className={`pagination__btns ${
                currPage === number && "pagination__active"
              }`}
              onClick={() => {
                paginate(number);
              }}
              href="!#"
            >
              {number}
            </Button>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default Pagination;
