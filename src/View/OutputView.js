const MissionUtils = require("@woowacourse/mission-utils");
const { PRINT, KEY } = require("../constants/constants");
/**
 * 사용자에게 게임 진행 상황과 결과를 출력하는 역할을 한다.
 */
const OutputView = {
  /**
   * 현재까지 이동한 다리의 상태를 정해진 형식에 맞춰 출력한다.
   * <p>
   * 출력을 위해 필요한 메서드의 인자(parameter)는 자유롭게 추가하거나 변경할 수 있다.
   */
  reverse(direction) {
    return direction === KEY.UP ? KEY.DOWN : KEY.UP;
  },

  printMap(bridgeMap, location, correct) {
    const maps = { U: "[", D: "[" };
    for (let i = 0; i < location; i++) {
      maps[bridgeMap[i]] += " O |";
      maps[OutputView.reverse(bridgeMap[i])] += "   |";
    }
    maps[bridgeMap[location]] += correct ? " O ]" : "   ]";
    maps[OutputView.reverse(bridgeMap[location])] += correct ? "   ]" : " X ]";
    MissionUtils.Console.print(maps[KEY.UP] + "\n" + maps[KEY.DOWN]);
  },

  /**
   * 게임의 최종 결과를 정해진 형식에 맞춰 출력한다.
   * <p>
   * 출력을 위해 필요한 메서드의 인자(parameter)는 자유롭게 추가하거나 변경할 수 있다.
   */
  printResult(game, location, correct) {
    MissionUtils.Console.print(PRINT.FINISH_GAME);
    OutputView.printMap(game.getBridgeMap(), location, correct);
    MissionUtils.Console.print(correct ? PRINT.SUCCESS_GAME : PRINT.FAIL_GAME);
    MissionUtils.Console.print(PRINT.TOTAL_TRY + game.getTryCount());
  },
};

module.exports = OutputView;
