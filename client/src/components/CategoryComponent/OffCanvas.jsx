import React from 'react';
import './OffCanvas.scss';
import FilterContent from './FilterContent';

function OffCanvas() {
  return (
    <>
      {/* 🔘 Mobile Toggle Button */}
      <button
        className="btn btn-dark d-md-none mb-3"
        data-bs-toggle="offcanvas"
        data-bs-target="#filterCanvas"
      >
        Filters
      </button>

      {/* 📱 Mobile Offcanvas */}
      <div
        className="offcanvas offcanvas-start d-md-none"
        tabIndex="-1"
        id="filterCanvas"
        aria-labelledby="filterCanvasLabel"
      >
        <div className="offcanvas-header">
          {/* Visible only inside mobile offcanvas */}
          <h5 className="fw-bold mb-0 d-md-none" id="filterCanvasLabel">
            Filters
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>

        <div className="offcanvas-body">
          <FilterContent />
        </div>
      </div>

      {/* 💻 Desktop Sidebar */}
      <div className="d-none d-md-block">
        <div className="offcanvas-custom shadow-sm">
          <h5 className="fw-bold mb-3">Filters</h5>
          <FilterContent />
        </div>
      </div>
    </>
  );
}

export default OffCanvas;