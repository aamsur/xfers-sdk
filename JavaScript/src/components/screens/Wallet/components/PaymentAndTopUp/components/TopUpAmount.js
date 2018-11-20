import React, { Component } from 'react'
import moment from 'moment'
import {
  StickyPanel,
  View,
  Text,
  ModalHeader,
  FormInputGroup,
  Button,
  LoadingPanel,
  AnchorLink,
  FooterButtonGroup
} from 'XfersComponents'
import { toCurrency } from 'UtilityFunctions'

export default class TopUpAmount extends Component {
  render() {
    const {
      error,
      dataLoading,
      availableBalance,
      newTopUpRequest: { topUpAmount },
      userTopUpStatus,
      updateTopUpDetails,
      submitNewTopUpRequest,
      goBack,
      goNext
    } = this.props;
    const { dailyLimit, remaining: remainingLimit, resetTiming } = userTopUpStatus;

    const disabled = remainingLimit <= 0 || !topUpAmount || topUpAmount < 1
    const createTopUpRequest = () => submitNewTopUpRequest(goNext);

    if (dataLoading) {
      return (<LoadingPanel title="Transfer Funds"/>)
    }

    if ( remainingLimit <= 0 ) {
      return <LimitReachedView goBack={goBack} resetTiming={resetTiming} dailyLimit={dailyLimit} />
    }

    return (
      <StickyPanel showBrand>
        <ModalHeader spHeader onBack={goBack} title="Transfer Funds" />
        <View spBody>
          <Text type="panelTitle">Enter top-up amount</Text>
          <FormInputGroup
            autoFocus
            leftAddonContent="SGD"
            placeholder="2000.00"
            value={topUpAmount}
            onChange={(e) => updateTopUpDetails('topUpAmount', e.target.value)}
            />
          <View textAlign="justify">
            {/*
              <Text type="blur">
                <strong>Note: </strong>
                During this top-up beta period, top-ups are not instantaneous. Note that processing times are officially at 11am, 5pm, and 11pm. If your request expires before the next processing time, it will not be automatically processed and you will have to wait for manual processing during office hours. Alternatively, you can wait for your request timer to reset before submitting a request and then it will be automatically processed at the next processing period.
              </Text>
            */}
          </View>
        </View>
        <View spFooter>
          <View marginBottom="10px"><Text type="error">{error}</Text></View>
          <View marginBottom="10px"><Text>Current Balance: <strong>{toCurrency(availableBalance)}</strong></Text></View>
          { true && <View marginBottom="10px"><Text type="note">Remaining top-up limit: <strong>{toCurrency(remainingLimit)}</strong> / {toCurrency(dailyLimit)}</Text></View>}
          { true &&
            <View marginBottom="10px">
              <Text type="blur">
                <strong>Note: </strong>
                An admin fee of 1% will be charged on your total amount transferred should you fail to comply with our
                <AnchorLink href="https://xfershelp.zendesk.com/hc/en-us/articles/360002374092" target> additional terms and conditions.</AnchorLink>
              </Text>
            </View>
          }
          <FooterButtonGroup>
            <Button type="primary" disabled={disabled} onClick={createTopUpRequest}>Next</Button>
          </FooterButtonGroup>
        </View>
      </StickyPanel>
    )
  }
}

class LimitReachedView extends Component {

  constructor(props) {
    super(props);
    this.state = { timeLeftTs: null }
  }

  componentDidMount() {
    this.timer = setInterval(this.tick, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  tick = () => {
    const { resetTiming } = this.props;
    const timeLeftTs = (moment(resetTiming).unix()) - (moment().unix());
    this.setState({ timeLeftTs });
  }

  processTimestamp = (timeLeftTs) => {
    let hr = Math.trunc(timeLeftTs / 3600);
    let min = Math.trunc((timeLeftTs % 3600) / 60);
    let sec = (timeLeftTs % 3600) % 60;
    return { hr, min, sec }
  }

  render() {
    const { timeLeftTs } = this.state;
    const timeLeft = this.processTimestamp(timeLeftTs);

    const { goBack, dailyLimit } = this.props;
    return (
      <StickyPanel showBrand>
        <ModalHeader spHeader onBack={goBack} title="Transfer Funds" />
        <View spBody>
          <View>
            <Text type="panelSubtitle">You have reached your {toCurrency(dailyLimit, {showZero: true})} limit in the last 24 hours</Text>
            <br/>
            <Text>
              Your next top-up will be available in
              <br/>
              <strong>{`${timeLeft.hr} hr ${timeLeft.min} min ${timeLeft.sec} sec`}</strong>
            </Text>
          </View>
        </View>
      </StickyPanel>
    )
  }
}
