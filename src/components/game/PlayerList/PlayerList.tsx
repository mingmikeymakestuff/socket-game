import * as React from "react";
import PlayerComponent from "../Player";
import {
  getPlayerDataById,
  getCurrentPlayerTurn,
  getPlayers,
  getCurrentRound,
  getPlayerData,
  getRoundStatus,
  getRounds
} from "selectors";
import { Player, ROUND_STATUS, Round } from "types/types";
import { connect } from "react-redux";
import { proposeTeam } from "socket";

interface PlayerListState {
  playerNeededTooltip : boolean;
}

interface PlayerListProps {
  players: Player[];
  turnToPick: Player;
  roundStatus: ROUND_STATUS;
  rounds: Round[];
  currentRound: number;
}

class PlayerList extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = { playerNeededTooltip: false };
  }

  public onProposeClick = () => {
    const { rounds, currentRound, players } = this.props;
    const playerNeeded = rounds[currentRound - 1].playersNeeded;
    let numPlayers = 0;
    players.forEach(p => (p.selected ? numPlayers++ : 0));
    if(numPlayers !== playerNeeded) {
      this.setState({ playerNeededTooltip: true });
    } else {
      if(this.state.playerNeededTooltip) {
        this.setState({ playerNeededTooltip: false });
      }
      proposeTeam();
    }
  };

  public onAccept = () => {
    // do something
  };

  public onReject = () => {
    // do something
  };

  public showProposeOrVoteButton() {
    const { turnToPick, roundStatus } = this.props;
    if (turnToPick && roundStatus === ROUND_STATUS.PROPOSING_TEAM) {
      return (
        <button
          onClick={this.onProposeClick}
          style={{ margin: "1rem", width: "100px", height: "50px" }}
        >
          Propose Team
        </button>
      );
    } else if (roundStatus === ROUND_STATUS.VOTING_TEAM) {
      return (
        <div className={"VotingButtons"}>
          <button
            onClick={this.onAccept}
            style={{ margin: "1rem", width: "100px", height: "50px" }}
          >
            Approve
          </button>
          <button
            onClick={this.onReject}
            style={{ margin: "1rem", width: "100px", height: "50px" }}
          >
            Reject
          </button>
        </div>
      );
    }
  }

  public showPlayerNeededToolTip() {
    if(this.state.playerNeededTooltip) {
      const { rounds, currentRound } = this.props;
      const playerNeeded = rounds[currentRound - 1].playersNeeded;
      return (
        <div>
          Please select {playerNeeded} players
        </div>
      );
    }
  }

  public render() {
    return (
      <div className="PlayerList">
        <h3 style={{ marginTop: "1rem" }}>
          Proposed Team:
          <div
            style={{
              flexDirection: "row",
              display: "flex",
              justifyContent: "center"
            }}
          >
            <div className="PlayerSelectLegend">
              <div
                className="ColorCode"
                style={{ backgroundColor: "rgb(15, 132, 228)" }}
              />
              <span>Selected</span>
            </div>
            <div className="PlayerSelectLegend">
              <div className="ColorCode" style={{ backgroundColor: "#FFF" }} />
              <span>Not Selected</span>
            </div>
          </div>
        </h3>
        <ul className="PlayerListItems">
          {this.props.players.map(player => (
            <li
              className="PlayerName"
              key={player.socketId}
              style={{
                display: "flex",
                flexDirection: "column"
              }}
            >
              <span>{player.nickName.substring(0, 7)}</span>
              <PlayerComponent key={player.socketId} player={player} />
            </li>
          ))}
        </ul>
        {this.showPlayerNeededToolTip()}
        {this.showProposeOrVoteButton()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const currentPlayerTurn: Player = getPlayerDataById(
    state,
    getCurrentPlayerTurn(state)
  );
  const players: Player[] = getPlayers(state);
  const currentRound: number = getCurrentRound(state);
  const playerData: Player = getPlayerData(state);
  const turnToPick = playerData.socketId === currentPlayerTurn.socketId;
  const roundStatus = getRoundStatus(state);

  return {
    players,
    turnToPick,
    roundStatus,
    rounds: getRounds(state),
    currentRound
  };
};

export default connect(mapStateToProps)(PlayerList);
