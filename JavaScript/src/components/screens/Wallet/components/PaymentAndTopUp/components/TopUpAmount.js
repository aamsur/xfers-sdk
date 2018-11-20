import React, { Component } from 'react'
import {
  StickyPanel,
  View,
  Text,
  ModalHeader,
  FormInputGroup,
  Button,
  LoadingPanel,
  FooterButtonGroup
} from 'XfersComponents'
import { toCurrency } from 'UtilityFunctions'

export default class TopUpAmount extends Component {

  constructor(props) {
    super(props);
    this.state = { timeLeftTs: null, localError: '' }
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
    const {
      error,
      dataLoading,
      availableBalance,
      newTopUpRequest: { topUpAmount },
      updateTopUpDetails,
      submitNewTopUpRequest,
      goBack,
      goNext
    } = this.props;
    const { timeLeftTs, localError } = this.state;

    const createTopUpRequest = () => {
      submitNewTopUpRequest(goNext);
    }

    const disabled = topUpAmount ? false : true

    if (dailyLimit < topUpLimit && firstValidTopUpRequest) {
      const timeLeft = this.processTimestamp(timeLeftTs);
      pbTopLabel = `24-hr Remaining Amount: ${toCurrency(dailyLimit, {showZero: true})}`;
      pbBtmLabel = (
        <span>
          <AnchorLink onClick={() => switchActiveStep("requests")}>Top-up requests </AnchorLink>
          made from {toReadableString({date: firstValidTopUpRequest.created_at, format: 'DD MMM YYYY'})} will expire in
          <br/>
          {`${timeLeft.hr} hr ${timeLeft.min} min ${timeLeft.sec} sec`}
        </span>
      );
    }

    if (dailyLimit <= 0) {
      const timeLeft = this.processTimestamp(timeLeftTs);
      pbTopLabel = `You have reached your ${toCurrency(topUpLimit, {showZero: true})} limit in the last 24 hours`
      pbBtmLabel = (
        <span>
          Your next top-up will be available in
          <br/>
          {` ${timeLeft.hr} hr ${timeLeft.min} min ${timeLeft.sec} sec`}
        </span>
      );
    }

    if (dataLoading) {
      return (<LoadingPanel title="Transfer Funds"/>)
    }

    return (
      <StickyPanel showBrand>
        <ModalHeader spHeader title="Transfer Funds" />
        <View spBody>

          { dailyLimit > 0 ?
            <View>
              <Text type="panelTitle">Enter top-up amount</Text>
              <FormInputGroup
                autoFocus
                leftAddonContent="SGD"
                placeholder="2000.00"
                value={topUpAmount}
                onChange={(e) => updateTopUpDetails('topUpAmount', e.target.value)}
                />
              <View>
                <View display="inline" marginRight="12px">
                  <Button size="small" type="secondary" onClick={() => updateTopUpDetails('topUpAmount', 500)}>500.00</Button>
                </View>
                <View display="inline" marginRight="12px">
                  <Button size="small" type="secondary" onClick={() => updateTopUpDetails('topUpAmount', 1000)}>1000.00</Button>
                </View>
                <View display="inline" marginRight="12px">
                  <Button size="small" type="secondary" onClick={() => updateTopUpDetails('topUpAmount', 2500)}>2500.00</Button>
                </View>
                <View display="inline" marginRight="12px">
                  <Button size="small" type="secondary" onClick={() => updateTopUpDetails('topUpAmount', 5000)}>5000.00</Button>
                </View>
              </View>
              <View textAlign="justify">
                <Text type="blur">
                  <strong>Note: </strong>
                  During this top-up beta period, top-ups are not instantaneous. Note that processing times are officially at 11am, 5pm, and 11pm. If your request expires before the next processing time, it will not be automatically processed and you will have to wait for manual processing during office hours. Alternatively, you can wait for your request timer to reset before submitting a request and then it will be automatically processed at the next processing period.
                </Text>
              </View>
            </View>
            :
            <View>
              <Text type="panelTitle">
                `You have reached your ${toCurrency(topUpLimit, {showZero: true})} limit in the last 24 hours`
              </Text>
              <br/>
              <Text type="panelTitle">
                <span>
                  Your next top-up will be available in
                  <br/>
                  {` ${timeLeft.hr} hr ${timeLeft.min} min ${timeLeft.sec} sec`}
                </span>
              </Text>
            </View>
          }

        </View>
        <View spFooter>
          {(localError || error) &&
            <View marginBottom="10px">
              <Text type="error">{error}</Text>
              <Text type="error">{localError}</Text>
            </View>
          }
          <View marginBottom="10px"><Text>Current Balance: {toCurrency(availableBalance)}</Text></View>
          { false && <View marginBottom="20px"><Text type="note">Remaining top-up limit:</Text></View>}
          { true &&
            <View marginBottom="20px">
              <Text type="blur">
                <strong>Note: </strong>
                An admin fee of 1% will be charged on your total amount transferred should you fail to comply with our
                <AnchorLink href="https://xfershelp.zendesk.com/hc/en-us/articles/360002374092" target> additional terms and conditions.</AnchorLink>
              </Text>
            </View>
          }
          <FooterButtonGroup>
            <Button type="primary" disabled={disabled} onClick={goNext}>Next</Button>
          </FooterButtonGroup>
        </View>
      </StickyPanel>
    )
  }
}
