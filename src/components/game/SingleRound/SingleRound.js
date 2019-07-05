import { FaChessKnight, FaSkull, FaRegQuestionCircle } from 'react-icons/fa'
import React, {Component} from "react";
import { TEAM } from 'types/types';

class SingleRound extends Component{
  roundStatus() {
    if(this.props.value == null)
    {
      return <FaRegQuestionCircle className="RoundIcon card-img-top"/>;
    }
    else if(this.props.value === TEAM.GOOD)
    {
      return <FaChessKnight className="Knight RoundIcon card-img-top"/>;
    } 
    else
    {
      return <FaSkull className="Spy RoundIcon card-img-top"/>;
    }
  }

  isCurrentRound() {
    return this.props.currentRound === this.props.roundNumber ? "RoundCurrentRound card" : "card";
  }

  render() {
    const { roundNumber, playersNeeded, failsNeeded } = this.props;
    return (
      <div className="RoundCol col">
        <div className={this.isCurrentRound()}>
          {this.roundStatus()}
          <div className="RoundCardBody card-body">
            <p className="card-text" style={{marginBottom: "0"}}>Round {roundNumber}</p>
            <p className="card-text" style={{fontSize: "13px", marginBottom: "0"}}>Players: {playersNeeded}</p>
            <p className="card-text" style={{fontSize: "13px"}}>Fails: {failsNeeded}</p>
          </div>
        </div>
      </div>
    );
  }


}

export default SingleRound;