import React from 'react'
import PropTypes from 'prop-types'
import ReactTable from 'react-table'
import '!style-loader!css-loader!react-table/react-table.css'
import cls from './ReactTable.scss'

const componentPropTypes = {
  loading: PropTypes.bool,
  pages: PropTypes.number,
  onStateChange: PropTypes.func,
  onRowClick: PropTypes.func,
  customClass: PropTypes.string,
  showPagination: PropTypes.bool,
  data: PropTypes.array.isRequired,
  tableColumns: PropTypes.array.isRequired,
}

const componentDefaultProps = {
  customClass: '',
  showPagination: true,
  onStateChange: () => console.log("onStateChangeFn Not Found")
};

class Datatable extends React.Component {
  constructor(props) {
    super(props);
  }

  fetchData = (state, instance) => {
    const {onStateChange} = this.props;
    this.setState({loading: true});
    onStateChange({
      pageSize: state.pageSize,
      page: state.page,
      sorted: state.sorted,
    });
  }

  render() {
    const {data, tableColumns, loading, pages, showPagination, onRowClick} = this.props;
    const defaultPageSize = 10;
    return (
      <div className={cls.tableContainer}>
        <ReactTable
          manual
          data={data}
          columns={tableColumns}
          className="-highlight"
          loading={loading}
          showPagination={showPagination}
          showPageSizeOptions={false}
          defaultPageSize={defaultPageSize}
          pages={pages}
          onFetchData={this.fetchData}
          getTdProps={(state, rowInfo, column, instance) => {
            return {
              style: {cursor: 'pointer'},
              onClick: (e, handleOriginal) => {if (onRowClick) {onRowClick(rowInfo)}}
            }
          }}
        />
      </div>
    );
  }
}

Datatable.propTypes = componentPropTypes;
Datatable.defaultProps = componentDefaultProps;

export default Datatable
