<script src="https://kit.fontawesome.com/ad29576ac3.js" crossorigin="anonymous"></script>
<nav class="sidebar-navigation">
    <ul>
        <li>
            <img src="Logo.png" alt="Logo">
            <span class="tooltip">COMMERZBANK</span>
        </li>
        <li>
            <i class="fa-solid fa-list-check"></i>
            <span class="tooltip">Main</span>
        </li>
        <li>
            <i class="fa-regular fa-calendar"></i>
            <span class="tooltip">Calendar</span>
        </li>
        <li>
            <i class="fa-solid fa-square-poll-vertical"></i>
            <span class="tooltip">Graphs</span>
        </li>
        <li>
            <i class="fa-brands fa-spotify"></i>
            <span class="tooltip">Spotify</span>
        </li>
        <li>
            <i class="fa-solid fa-gear"></i>
            <span class="tooltip">Settings</span>
        </li>
    </ul>
</nav>


<style lang="scss">
* {
  margin: 0;
  padding: 0;
  list-style: none;
  font-family: "Lato", sans-serif;
  line-height: 1;
}

body {
  background-color: #F5F6F8;
//   overflow: hidden;
}

.sidebar-navigation {
  display: inline-block;
//   min-height: 100vh;
height: 100%;
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
  background-color: #22252E;
}
.sidebar-navigation ul li:hover .tooltip {
  visibility: visible;
  opacity: 1;
}
.sidebar-navigation ul li.active {
  background-color: rgba(255, 255, 255, 0.1);
}
.sidebar-navigation ul li.active i {
  color: #98D7EC;
}

    
</style>