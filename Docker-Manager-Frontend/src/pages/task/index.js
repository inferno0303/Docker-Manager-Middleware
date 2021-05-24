import React from 'react';
import { connect } from 'umi';
import { PageHeader } from 'antd';


class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading:  false
    }
  }

  // initData
  initData = async () => {
    await this.setState({ loading: true })
    await this.setState({ loading: false })
  }

  // life Cycle
  componentDidMount() {
    this.initData().then()
  }

  render() {

    const renderPageHeader = () => {
      return <div>
        <PageHeader title={'后台任务'}
                    subTitle={'在此查看后台任务执行状态'}
        />
      </div>
    }

    return <div>
      { renderPageHeader() }
    </div>
  }

}

function mapToStateToProps({ globalModel }) {
  const { dockerImageList } = globalModel;
  return { dockerImageList }
}

export default connect(mapToStateToProps)(Task);
