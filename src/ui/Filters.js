import React, { useState } from "react";
import moment from "moment";
import { Input, Select, DatePicker, Layout } from 'antd';
import { Label } from "reactstrap";
const { Option } = Select;
const { RangePicker } = DatePicker;

export const InputGroupFilter = ({ searchSelectName, searchSelectValue, searchOptionData, Disabled, searchInputName, searchInputValue, searchOnChangeSelect, searchOnchangeInput, handleKeyDown }) => {
    return (
        <>
            <Label>Search</Label>
            <Input.Group compact>
                <Select style={{ width: '50%' }}
                    name={searchSelectName}
                    onChange={searchOnChangeSelect}
                    value={searchSelectValue || undefined}
                    placeholder="Select By"
                    autoComplete="off"
                    // showSearch
                    removeIcon
                >
                    {searchOptionData && searchOptionData.map((search, s) => (
                        <Option key={s} value={search.key} style={{ textTransform: "capitalize" }}>{search.value}</Option>
                    ))}
                </Select>
                <Input disabled={Disabled} style={{ width: '50%' }}
                    placeholder="Search"
                    name={searchInputName}
                    value={searchInputValue}
                    onChange={searchOnchangeInput}
                    autoComplete="off"
                    onKeyDown={handleKeyDown}
                />
            </Input.Group>
        </>
    );
};

export const DateRangeFilter = ({ handleOnDateChange, dateValue, disabled, labelName, ...props }) => {
    const [dates, setDates] = useState(null);
    const disabledDate = (current) => {
        const [startDate, endDate] = dateValue;
        if (!dates) {
            return false;
        }

        // Disable dates before January 1, 2020
        const tooEarly = current < moment('2020-01-01');

        // Disable dates that are more than 31 days apart from the selected range
        const tooLate = dates[0] && current.diff(dates[0], 'days') >= 31;

        const disableOtherDates = current.isBefore(startDate, 'day') || current.isAfter(endDate, 'day')

        return tooEarly || tooLate || current > moment().endOf("day") || dateValue.length === 2 && disableOtherDates;
    };
    console.log("dates", dates);

    const onOpenChange = (open) => {
        if (open) {
            setDates([null, null]);
        } else {
            setDates(null);
        }
    };
    return (
        <>
            <Label>{labelName || 'Created Date Filter'}</Label>
            <RangePicker
                style={{ width: '100%' }}
                separator={"-"}
                value={dateValue}
                format="YYYY-MM-DD"
                disabledDate={disabledDate}
                allowClear={false}
                disabled={disabled}
                onCalendarChange={(val) => setDates(val)}
                onChange={handleOnDateChange}
                onOpenChange={onOpenChange}
                inputReadOnly
                {...props}
            />
        </>
    );
};

export const DateFilter = ({ LabelName, handleOnDateChange, dateValue }) => {
    return (
        <>
            <Label>{LabelName}</Label>
            <DatePicker
                style={{ width: '100%' }}
                value={dateValue}
                format="YYYY-MM-DD"
                allowClear={true}
                onChange={handleOnDateChange}
            />
        </>
    );
};

export const ButtonFilter = ({ onClickSearch, removeFilter }) => {
    return (
        <>
            <button className="btn btn-primary px-3" onClick={onClickSearch}>Submit</button>
            <button className="btn btn-outline-danger ms-3" onClick={removeFilter}>Reset</button>
        </>
    );
};

// Use All Dropdowns Filters ---> New Dropdown - use this dropdown for all components
export const DropdownFilter = ({ dropdownLabel, dropdownValue, dropdownName, dropdownData, dropdownOnChange, dropdownPlaceholder, disabled }) => {
    return (
        <>
            <Label>{dropdownLabel}</Label>
            <Select style={{ width: '100%' }}
                name={dropdownName}
                placeholder={dropdownPlaceholder}
                value={dropdownValue || undefined}
                onChange={dropdownOnChange}
                autoComplete="off"
                optionFilterProp="children"
                disabled={disabled}
                // showSearch
                removeIcon
            >
                {dropdownData && dropdownData.map((dropdown, s) => (
                    <Option key={s} value={dropdown.key}>{dropdown.value}</Option>

                ))}
            </Select>
        </>
    );
};

export const AgentDropdownFilter = ({ dropdownLabel, dropdownValue, dropdownName, dropdownData, dropdownOnChange, dropdownPlaceholder, mapValue }) => {
    return (
        <>
            <Label>{dropdownLabel}</Label>
            <Select style={{ width: '100%' }}
                name={dropdownName}
                placeholder={dropdownPlaceholder}
                value={dropdownValue || undefined}
                onChange={dropdownOnChange}
                autoComplete="off"
                optionFilterProp="children"
                // showSearch
                removeIcon
            >
                {dropdownData.map((dropdown, s) => (
                    <Option key={s} value={dropdown?.agent_id}>{dropdown?.name?.full}</Option>

                ))}
            </Select>
        </>
    );
};

export const TlDropdownFilter = ({ dropdownLabel, dropdownValue, dropdownName, dropdownData, dropdownOnChange, dropdownPlaceholder, mapValue, disabled, }) => {
    return (
        <>
            <Label>{dropdownLabel}</Label>
            <Select style={{ width: '100%' }}
                name={dropdownName}
                placeholder={dropdownPlaceholder}
                value={dropdownValue || undefined}
                onChange={dropdownOnChange}
                autoComplete="off"
                optionFilterProp="children"
                // showSearch
                removeIcon
                disabled={disabled}
            >
                {dropdownData.map((dropdown, s) => (
                    <Option key={s} value={dropdown?.agent_id}>{dropdown?.name?.full}</Option>

                ))}
            </Select>
        </>
    );
};

export const PartnerDropdownFilter = ({ dropdownLabel, dropdownValue, dropdownName, dropdownData, dropdownOnChange, dropdownPlaceholder, disabled }) => {
    return (
        <>
            <Label>{dropdownLabel}</Label>
            <Select style={{ width: '100%' }}
                name={dropdownName}
                placeholder={dropdownPlaceholder}
                value={dropdownValue || undefined}
                onChange={dropdownOnChange}
                autoComplete="off"
                optionFilterProp="children"
                removeIcon
                disabled={disabled}
            >
                {dropdownData.map((dropdown, s) => (
                    <Option key={s} value={dropdown?.partner_id}>{dropdown?.name?.full}</Option>

                ))}
            </Select>
        </>
    );
};

// Common Custom filter
export const GeneralDateRange = ({ handleOnDateChange, dateValue, dateReset, dateRangeApiCall, isCalendar, setIsCalendar, handleClear, ...props }) => {
    const [dates, setDates] = useState(null);
    const disabledDate = (current) => {
        if (!dates) {
            return false;
        }
        const tooLate = dates[0] && current.diff(dates[0], 'days') >= 31;
        const tooEarly = dates[1] && dates[1].diff(current, 'days') >= 31;
        return current > moment().endOf("day") || !!tooEarly || !!tooLate;
    };
    console.log("dates", dates);
    const onOpenChange = (open) => {
        if (open) {
            setDates([null, null]);
        } else {
            setDates(null);
        }
    };
    return (
        <>
            <span className="me-3 mb-3 " style={{ maxWidth: '300px' }}>
                {isCalendar ? (
                    <span
                        className="btn btn-outline-primary "
                        onClick={setIsCalendar}
                        style={{ width: '200px' }}
                    >
                        <i className="bx bxs-calendar me-2"></i>
                        Custom Date Filter
                    </span>
                ) : (
                    <span className="border-0 ">
                        <div style={{ position: 'relative' }}>
                            <RangePicker
                                animateYearScrolling={false}
                                separator={"-"}
                                value={dateValue}
                                format="YYYY-MM-DD"
                                disabledDate={disabledDate}
                                allowClear={true}
                                onCalendarChange={(val) => setDates(val)}
                                onChange={handleOnDateChange}
                                onOpenChange={onOpenChange}
                                clearIcon
                                onClear={handleClear}
                                {...props}
                                inputReadOnly
                            />
                            <button
                                className="btn btn-info custom-date-addon "
                                type="button"
                                onClick={dateRangeApiCall}
                            >
                                <i
                                    title="Click here"
                                    className="bx bx-right-arrow-alt bx-flashing fs-2"
                                ></i>
                            </button>
                        </div>
                    </span>
                )}
            </span>

        </>
    );
};