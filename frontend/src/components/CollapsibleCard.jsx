import './CollapsibleCard.css';
import toggleIcon from './Images/Button-tiny.png';
import starIcon from './Images/star.png';
import headerIcon from './Images/Avatar.png';


const CollapsibleCard = ({ dayNumber, imagePath, text }) => {
    return (
      <div className="card">
        <div className="card-header">
          <img src={headerIcon} alt="Header Icon" className="header-icon" />
          Day {dayNumber}
          <img src={toggleIcon} alt="Toggle" className="toggle-icon" />
        </div>
        <div className="card-body">
          {imagePath && (
            <a href={imagePath} target="_blank" rel="noopener noreferrer">
              <img src={imagePath} alt={`Day ${dayNumber}`} className="card-image" />
            </a>
          )}
          <p className="card-text">{text}</p>
          <div className="card-actions">
            <button className="action-btn save-btn">
              <img src={starIcon} alt="Star" className="star-icon" /> Save
            </button>
            <button className="action-btn comment-btn">Change</button>
          </div>
        </div>
      </div>
    );
  };
export default CollapsibleCard;
