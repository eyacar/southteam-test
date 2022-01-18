import React, { useState, useEffect, useMemo, memo } from "react";
import PropTypes from "prop-types";
import { isEmpty, isArray, isNumber } from "lodash";
import DataHelper from "../../../helpers/DataHelper";
import { v4 as uuidv4 } from "uuid";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import Scss from "./Pagination.module.scss";

const Pagination = ({ data, amountOfData, page: Component }) => {
  const [pages, setPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    const helper = new DataHelper();
    if (isEmpty(data) || !isArray(data) || !isNumber(amountOfData)) return null;
    helper.pagination(data, amountOfData);

    setPages(helper.arrayOfPages);
  }, [data, amountOfData]);

  const handlePageChange = (event) => {
    setPageNumber(Number(event.target.value));
    window.scroll(0, 0);
  };

  const pageButtons = useMemo(() => {
    if (isEmpty(pages)) return null;

    return (
      <ToggleButtonGroup
        value={pageNumber}
        exclusive
        color="primary"
        onChange={handlePageChange}
        aria-label="pages selector"
      >
        {pages.map(({ page }) => (
          <ToggleButton value={page} aria-label={`page ${page}`} key={uuidv4()}>
            {page}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    );
  }, [pages, pageNumber]);

  if (isEmpty(pages) || typeof Component !== "function") return null;

  return (
    <div className={Scss.container} data-testid="Pagination">
      <Component data={pages.find(({ page }) => page === pageNumber).data} />
      {pageButtons}
    </div>
  );
};

export default memo(Pagination, (prevData, nextData) => {
  return prevData.data === nextData.data;
});

Pagination.propTypes = {
  data: PropTypes.array.isRequired, // The data you need to separate on pages.
  amountOfData: PropTypes.number.isRequired, // The amount of data you need to show per page.
  page: PropTypes.elementType.isRequired, // The component that handle the data from the page, this component will need to receive a data props.
};
