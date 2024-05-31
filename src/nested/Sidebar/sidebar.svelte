<script>
import SpotifyLogin from '../spotifyLogin/spotify_login.svelte' 
</script>


<nav class="sidebar-navigation">
  <ul class="no-bullets">
      
      <li>
          <a href="index.html">
              <img src="Logo.png" alt="Logo" width="35" height="30">
          </a>
      </li>
      <li>
          <a href="">
            <img src="icon_squares.png" alt="Tasks" width="22" height="22">
          </a>
          <span class="tooltip">Tasks</span>
      </li>
      <li>
          <a href="">
            <img src="icon_calendar.png" alt="Calendar" width="22" height="22">
          </a>
          <span class="tooltip">Calendar</span>
      </li>
      <li>
          <a href="">
            <img src="icon_graph.png" alt="Graphs" width="22" height="22">
          </a>
          <span class="tooltip">Graphs</span>
      </li>
      <li>
          
            <SpotifyLogin/>
          
          <span class="tooltip">Spotify</span>
      </li>
      <li>
          <a href="">
            <img src="icon_sliders.png" alt="Settings" width="22" height="22">
          </a>
          <span class="tooltip">Settings</span>
      </li>
  </ul>
</nav>


<style lang="scss">
/* Sidebar */

li {
  max-height: 26px;
  overflow: visible;

}
ul.no-bullets {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
.sidebar-navigation {
  display: inline-block;
  min-height: 100vh;
  /* height: 100%; */
  width: 80px;
  background-color: #002E3C;
  float: left;
}
.sidebar-navigation ul {
  text-align: center;
  color: white;
}
.sidebar-navigation ul li {
  padding: 28px 0;
  cursor: pointer;
  transition: all ease-out 120ms;
}
.sidebar-navigation ul li i {
  display: block;
  font-size: 24px;
  transition: all ease 450ms;
  color: #FFFF;
}
.sidebar-navigation ul li a {
  text-decoration: none;
}
.sidebar-navigation ul li .tooltip {
  display: inline-block;
  position: absolute;
  background-color: #313443;
  padding: 8px 15px;
  border-radius: 3px;
  margin-top: -26px;
  left: 90px;
  opacity: 0;
  visibility: hidden;
  font-size: 13px;
  letter-spacing: 0.5px;
}
.sidebar-navigation ul li .tooltip:before {
  content: "";
  display: block;
  position: absolute;
  left: -4px;
  top: 10px;
  transform: rotate(45deg);
  width: 10px;
  height: 10px;
  background-color: inherit;
}
.sidebar-navigation ul li:hover {
  background-color: rgba(255, 255, 255, 0.1);
}
.sidebar-navigation ul li:hover .tooltip {
  visibility: visible;
  opacity: 1;
}
.sidebar-navigation ul li.active {
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
}
.sidebar-navigation ul li.active i {
  color: #98D7EC;
}

/*@media screen and (max-width: 700px) {
  .sidebar-navigation {
    width: 100%;
    height: auto;
    position: relative;
  }
}

@media screen and (max-width: 400px) {
  .sidebar-navigation a {
    text-align: center;
    float: none;
  }
}*/
</style>