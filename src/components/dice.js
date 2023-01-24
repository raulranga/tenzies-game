export default function Dice(props) {
  const styles = {
    backgroundColor: props.held ? "#59E391" : "#f5f5f5",
  };
  return (
    <div
      className="dice"
      onClick={() => props.handleHold(props.id)}
      style={styles}
    >
      <h2 className="dice-num">{props.value}</h2>
    </div>
  );
}
