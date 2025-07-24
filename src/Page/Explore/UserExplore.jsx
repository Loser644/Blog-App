import './expore.css'
export default function ExplorePage() {
    return(
        <div className="underTaker">
            <div className="expLoreDiv">
                <div className="PublicerDiv scrollDiv">
                    <div className="publicer-container">
                        <img src="https://i.postimg.cc/gcwDcPpS/user.png" alt="DP" />
                        <span>John Wick</span>
                        <div className="recetBlog">
                            <p>Recent...</p>
                         <div className="blogContainer">
                            <h3>Title</h3>
                            </div>   
                        </div>
                        <div className="follow-stats">
                            
                        <div className="follower">
                            <h2>0</h2>
                            <p>Followers</p>
                        </div>
                        <div className="following">
                            <h2>0</h2>
                            <p>Following</p>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}