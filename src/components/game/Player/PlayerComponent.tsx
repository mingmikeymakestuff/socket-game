import * as React from "react";
import { ROUND_STATUS, Player, Round } from "types/types";
import { pickPlayer } from "socket";
import {
  getPlayerDataById,
  getCurrentPlayerTurn,
  getPlayers,
  getCurrentRound,
  getPlayerData,
  getRounds
} from "selectors";
import { connect } from "react-redux";

interface PlayerComponentOwnProps {
  readonly key: number;
  readonly player: Player;
}

interface PlayerComponentStateProps {
  readonly currentPlayerTurn: Player;
  readonly players: Player[];
  readonly currentRound: number;
  readonly playerData: Player;
  readonly rounds: Round[];
}

interface PlayerComponentProps
  extends PlayerComponentOwnProps,
    PlayerComponentStateProps {}

class PlayerComponent extends React.Component<PlayerComponentProps, any> {
  public onPlayerClick = () => {
    const { players, player, currentRound, rounds } = this.props;
    const socketId = player.socketId;
    const playerPicked = players.find(asdf => asdf.socketId === socketId);
    let numPlayers = 0;
    players.forEach(p => (p.selected ? numPlayers++ : 0));
    const pNeeded = rounds[currentRound - 1].playersNeeded;
    if (numPlayers < pNeeded && playerPicked!.selected === 0) {
      pickPlayer(socketId, 1);
    } else {
      pickPlayer(socketId, 0);
    }
  };

  public getPlayerClasses() {
    let classes = "";
    classes +=
      this.props.player.selected === 0 ? "PlayerUnclicked" : "PlayerClicked";
    return classes;
  }

  public render() {
    const { player } = this.props;
    return (
      <li className={this.getPlayerClasses()} onClick={this.onPlayerClick}>
        <span>{player.nickName ? player.nickName.substring(0, 1) : ""}</span>
      </li>
    );
  }
}

const mapStateToProps = (state: any): PlayerComponentStateProps => {
  const currentPlayerTurn: Player = getPlayerDataById(
    state,
    getCurrentPlayerTurn(state)
  );
  const players: Player[] = getPlayers(state);
  const currentRound: number = getCurrentRound(state);
  const playerData: Player = getPlayerData(state);

  return {
    playerData,
    currentPlayerTurn,
    players,
    currentRound,
    rounds: getRounds(state)
  };
};

export default connect(mapStateToProps)(PlayerComponent);
