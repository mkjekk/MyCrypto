import React from 'react';
import { connect } from 'react-redux';
import { AppState } from 'reducers';
import { translateRaw } from 'translations';
import WalletDecrypt, { DisabledWallets } from 'components/WalletDecrypt';
import { IWallet } from 'libs/wallet/IWallet';
import closeIcon from 'assets/images/close.svg';
import { SecondaryButton } from 'components';
import './UnlockHeader.scss';

interface Props {
  title?: string;
  wallet: IWallet;
  disabledWallets?: DisabledWallets;
  showGenerateLink?: boolean;
}

interface State {
  isExpanded: boolean;
}

export class UnlockHeader extends React.PureComponent<Props, State> {
  public state = {
    isExpanded: !this.props.wallet
  };

  public componentDidUpdate(prevProps: Props) {
    if (this.props.wallet !== prevProps.wallet) {
      this.setState({ isExpanded: !this.props.wallet });
    }
  }

  public render() {
    const { title, wallet, disabledWallets, showGenerateLink } = this.props;
    const { isExpanded } = this.state;

    return (
      <article className="UnlockHeader">
        {title && <h1 className="UnlockHeader-title">{title}</h1>}
        {wallet &&
          !isExpanded && (
            <SecondaryButton
              text={translateRaw('CHANGE_WALLET')}
              onClick={this.toggleisExpanded as any}
              className="UnlockHeader-open btn-smr"
            >
              {/* use 'children' prop for inline icons */}
              <i className="fa fa-refresh" />
            </SecondaryButton>
          )}
        {wallet &&
          isExpanded && (
            <button className="UnlockHeader-close" onClick={this.toggleisExpanded}>
              <img src={closeIcon} alt="close" />
            </button>
          )}
        <WalletDecrypt
          hidden={!this.state.isExpanded}
          disabledWallets={disabledWallets}
          showGenerateLink={showGenerateLink}
        />
      </article>
    );
  }

  public toggleisExpanded = (_: React.FormEvent<HTMLButtonElement>) => {
    this.setState(state => {
      return { isExpanded: !state.isExpanded };
    });
  };
}

function mapStateToProps(state: AppState) {
  return {
    wallet: state.wallet.inst
  };
}

export default connect(mapStateToProps)(UnlockHeader);
