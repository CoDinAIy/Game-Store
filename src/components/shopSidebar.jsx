//shows filter options all/top(this month/this year/all time)/platform(ps4/pc/xbox etc)/genre(horror/racing/sports etc)
//when filter is clicked updates state in parent component which passes to shoppage
import '../styles/shopSidebar.css'

export default function sidebar() {
    return (
        <div className="sidebar-container">
            <div className="top-games-container">
                <div className="top-all-time">All time</div>
                <div className="top-this-year">This Year</div>
            </div>
            <div className="platforms-container">
                <div className="pc">PC</div>
                <div className="playstation">PlayStation</div>
                <div className="xbox">Xbox One</div>
                <div className="nintendo-switch">Nintendo Switch</div>
                <div className="ios">iOS</div>
                <div className="android">Android</div>
            </div>
            <div className="genres-container">
                <div className="action">Action</div>
                <div className="strategy">Strategy</div>
                <div className="rpg">RPG</div>
                <div className="shooter">Shooter</div>
                <div className="adventure">Adventure</div>
                <div className="puzzle">Puzzle</div>
                <div className="racing">Racing</div>
                <div className="sports">Sports</div>
            </div>
        </div>
    )
}