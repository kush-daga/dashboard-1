import {
  Button,
  Card,
  Dropdown,
  HelperText,
  Input,
  Label,
} from "@windmill/react-ui";
import DateRangePicker from "@wojtekmaj/react-daterange-picker/dist/entry.nostyle";
import fuzzysort from "fuzzysort";
import React, { useState } from "react";
import DatePicker from "react-date-picker/dist/entry.nostyle";
import { Calendar, ChevronDown } from "react-feather";
import { CONTENT, FACILITY_TYPES } from "../../utils/constants";

function Filter({
  timeseries,
  setTimeseries,
  date,
  dateOnChange,
  dates,
  datesOnChange,
  maxDate,
  floating,
  filterFacilityTypes,
  setFilterFacilityTypes,
  content,
}) {
  const [FACILITY_TYPESFilterOptions, setFacilityTypesFilterOptions] = useState(
    FACILITY_TYPES
  );
  const [_filterFacilityTypes, _setFilterFacilityTypes] = useState(
    filterFacilityTypes
  );
  const [facilityTypeFilterOpen, setFacilityTypeFilterOpen] = useState(false);
  const resetFacilityTypeFilter = () => {
    setFacilityTypeFilterOpen(false);
    setFacilityTypesFilterOptions(FACILITY_TYPES);
  };

  return (
    <div>
      <div
        className={`${
          floating
            ? "absolute inset-x-0 top-0 mt-10 z-40 flex-shrink-0 "
            : "mb-8 rounded-lg"
        } flex flex-row items-center justify-between px-4 py-2 bg-white shadow-md dark:bg-gray-800`}
      >
        <p className="dark:text-gray-400">Filters</p>
        <div className="flex space-x-2">
          {content != CONTENT.COVID && (
            <div className="relative bg-white rounded-lg dark:bg-gray-900">
              <Button
                layout="link"
                onClick={() =>
                  setFacilityTypeFilterOpen(!facilityTypeFilterOpen)
                }
                iconRight={ChevronDown}
                className="shadow-xs"
              >
                Facility Type
              </Button>
              <Dropdown
                isOpen={facilityTypeFilterOpen}
                align="right"
                onClose={() => resetFacilityTypeFilter()}
                className="z-40"
              >
                <Label className="mb-2">
                  <div className="flex space-x-2">
                    <Input
                      className="dark:bg-gray-900"
                      placeholder="Search facility types"
                      onChange={(e) => {
                        setFacilityTypesFilterOptions(
                          e.target.value
                            ? fuzzysort
                                .go(e.target.value, FACILITY_TYPESFilterOptions)
                                .map((v) => v.target)
                            : FACILITY_TYPES
                        );
                      }}
                    />
                    <Button
                      layout="link"
                      onClick={() => _setFilterFacilityTypes([])}
                      className="shadow-xs dark:bg-gray-900"
                    >
                      Clear
                    </Button>
                    <Button
                      layout="link"
                      onClick={() => _setFilterFacilityTypes(FACILITY_TYPES)}
                      className="shadow-xs dark:bg-gray-900"
                    >
                      All
                    </Button>
                  </div>

                  <HelperText className="ml-1">
                    {`Selected ${_filterFacilityTypes.length} items`}
                  </HelperText>
                </Label>

                <Card className="flex flex-col h-64 p-2 mb-2 overflow-y-auto ">
                  {FACILITY_TYPESFilterOptions.map((d, i) => (
                    <Label key={i} check>
                      <Input
                        onClick={() => {
                          let _t = _filterFacilityTypes.findIndex(
                            (t) => t === d
                          );
                          let _tmp = [..._filterFacilityTypes];
                          if (_t > -1) {
                            _tmp.splice(_t, 1);
                          } else {
                            _tmp.push(d);
                          }
                          _setFilterFacilityTypes(_tmp);
                        }}
                        type="checkbox"
                        checked={_filterFacilityTypes.includes(d)}
                      />
                      <span className="ml-2">{d}</span>
                    </Label>
                  ))}
                </Card>
                <div className="flex justify-end space-x-2">
                  <Button
                    onClick={() => setFilterFacilityTypes(_filterFacilityTypes)}
                    className="shadow-xs "
                  >
                    Apply
                  </Button>
                  <Button
                    onClick={() => resetFacilityTypeFilter()}
                    className="shadow-xs "
                  >
                    Cancel
                  </Button>
                </div>
              </Dropdown>
            </div>
          )}

          <div className="bg-white rounded-lg dark:bg-gray-900 dark:text-gray-700">
            <Button
              layout="link"
              onClick={() => setTimeseries(false)}
              className="rounded-r-none shadow-xs"
              disabled={!timeseries}
            >
              <span className="capitalize">Single</span>
            </Button>
            <Button
              layout="link"
              onClick={() => setTimeseries(true)}
              className="rounded-l-none shadow-xs"
              disabled={timeseries}
            >
              <span className="capitalize">Range</span>
            </Button>
          </div>
          {!timeseries ? (
            <DatePicker
              autoFocus={false}
              calendarIcon={
                <Calendar className="text-gray-600 dark:text-gray-400" />
              }
              clearIcon={null}
              calendarClassName="p-1 font-sans bg-white rounded-lg dark:bg-gray-900 text-gray-600 dark:text-gray-400"
              tileClassName="font-sans rounded-lg p-2"
              className="px-1 font-sans text-gray-600 bg-white rounded-lg shadow-xs dark:bg-gray-900 dark:text-gray-400"
              value={date}
              onChange={dateOnChange}
              maxDate={maxDate}
              format="dd/MM/yyyy"
            />
          ) : (
            <DateRangePicker
              autoFocus={false}
              calendarIcon={
                <Calendar className="text-gray-600 dark:text-gray-400" />
              }
              clearIcon={null}
              calendarClassName="p-1 font-sans bg-white rounded-lg dark:bg-gray-900 text-gray-600 dark:text-gray-400"
              tileClassName="font-sans rounded-lg p-2"
              className="px-1 font-sans text-gray-600 bg-white rounded-lg shadow-xs dark:bg-gray-900 dark:text-gray-400"
              value={dates}
              onChange={datesOnChange}
              maxDate={maxDate}
              format="dd/MM/yyyy"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Filter;
