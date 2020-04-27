import { html } from 'htm/preact';
import { Component } from 'preact';
import { Expandable } from './Expandable.js';
import { Ticker } from './Ticker.js';
import css from 'csz';
import { Settings } from './Settings.js';
import { installMediaQueryWatcher } from 'pwa-helpers/media-query.js';
import Tabs from '../components/Tabs.js';
import { close, trues, burger } from '../assets/icons/icons.js';

const styles = css`
  & {
    margin-top: 30px;
    margin-bottom: 20px;
    width: 100%;
    border-collapse: collapse;
  }

  th {
    border-top: transparent;
    padding: 15px;
  }
  th:nth-child(1),
  th:nth-child(2) {
    border-left: transparent;
    border-right: 1px solid var(--ld-text);
    border-bottom: 1px solid var(--ld-text);
  }

  th:nth-child(3) {
    border-bottom: 1px solid var(--ld-text);
  }

  td:nth-child(1) {
    border-left: transparent;
    border-right: 1px solid var(--ld-text);
  }

  td:nth-child(2) {
    border-right: 1px solid var(--ld-text);
  }

  th,
  td:nth-child(3) {
    border-right: transparent;
  }
  td:nth-child(3),
  td:nth-child(2),
  td:nth-child(1) {
    border-bottom: 1px solid var(--ld-text);
  }
  tr {
    font-weight: 600;
    font-size: 14px;
    padding: 15px;
    border-top: transparent;
  }

  tr:last-of-type {
    td {
      border-bottom: transparent;
    }
  }

  .note {
    font-weight: 100;
    font-size: 12px;
  }

  td {
    text-align: center;
    padding: 15px;
    svg {
      stroke: var(--ld-text);
    }
  }

  .circle {
    width: 20px;
    height: 20px;
    border-radius: 50%;
  }
  .default {
    background: #cccccc;
  }
  .blue {
    background: #7aaeff;
  }
  .red {
    background: #eb5757;
  }
  .yellow {
    background: #f2994a;
  }
  .green {
    background: #6fcf97;
  }
`;
const preStyles = css`
@media (max-width: 960px){
  .ld-menu--content {
    display: block;
    top: 0px;
    left: calc(100% - 100vw);
    height: 100%;
    position: absolute;
    background-color: white;
    width: calc(100vw - 100%);
    overflow: auto;
  }
}
`;
const styles2 = css`

@media (max-width: 960px){
&{
    width: 20%;
    height: 100%;
    position: absolute;
    padding: 0;
    right: 0px;
    top: 0px;
    background-color: #F2F2F2;
    z-index: 1100;
    & .ld-menu-nav{
      display: flex;
      height: 100%;
      width: 100%;
        & nav {
          width: 100%;
          padding: 10px 0px 10px 0px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          & ul {
            padding: 0;
            justify-content: space-around;
            justify-content: flex-start;
            align-items: center;
            min-height: 50%;
            display: flex;
            flex-direction: column;
            & li{
              margin-bottom: 29%;
              & button{
                &:active{
                  box-shadow: none;
                  outline: none;
                }
              }
              & .ld-menu--active{
                position: relative;
                
                &::before{
                  position: absolute;
                  left: -9px;
                  top: -15px;
                  z-index: -1;
                  content: ' ';
                  border-bottom: 70px solid #FFFFFF;
                  border-left: 17.5px solid transparent;
                  border-right: 17.5px solid transparent;
                  height: 0;
                  width: 70px;
                  transform: rotate(90deg);
                  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
                }
              }
              & svg {
                color: #999999;
              }
            }
          }
        }
      
    }
}
}
`;

const sideBtn = css`
  &{
    position: absolute;
    height: 0px;
    z-index: 2000;
    top: calc((100vh / 2) - 20px);
    right: 0px;
    position: absolute;
    border-bottom: 50px solid #FFFFFF;
    border-left: 12.5px solid transparent;
    border-right: 12.5px solid transparent;
    height: 0;
    width: 50px;
    box-shadow: none;
    background-color: transparent;
    transform: rotate(-90deg);
    & svg{
      margin-left: -3px;
      margin-top: 20px;
      transform: rotate(-90deg);
    } 
  }
`;

const renderMenu = (menuItem) => {
  switch (menuItem) {
    case 'info':
      return {
        title: 'info',
        template: html`
          <h1>Lockdown</h1>
          <p class="ld-alpha">
            Project lockdown is currently in alpha. Not all data may be available yet.
          </p>
          <p>
            <b>Project Lockdown</b> aims to map the different lockdowns around the world, offering the public a number of relevant metrics
            in order to provide an overview of the restrictions applied worldwide. We hope this will help evaluate the seriousness of the
            COVID-19 pandemic and help journalists and Human Rights defenders in their reporting and overseeing tasks.
          </p>

          <${Expandable}
            toggle=${'About'}
            detail=${html`
              <p>
                While lockdowns generally help countries to flatten the curve, and prevent COVID-19 from spreading, countries with a
                dictatorial nature may see this as an opportunity to increase their grasp over a country, and even potentially lead to
                martial law type scenarios. Governments may unnecesarily prolong lockdowns or not stick to their announced end dates for
                political gain. <b>Project Lockdown</b> aims to visualize these situations.
              </p>
            `}
          />

          <${Expandable}
            toggle=${'Legend'}
            detail=${html`
              <p>The map shows two parameters for territories:</p>
              <ol>
                <li>If the country is under any type of lockdown</li>
                <li>If there are covid cases in the country</li>
              </ol>
              <table class=${styles}>
                <tr>
                  <th scope="col"></th>
                  <th scope="col">Lockdown</th>
                  <th scope="col">COVID-19</th>
                </tr>
                <tr>
                  <td scope="row"><div aria-label="blue" class="blue circle"></div></td>
                  <td><div aria-label="no">${close}</div></td>
                  <td><div aria-label="no">${close}</div></td>
                </tr>
                <tr>
                  <td scope="row"><div aria-label="green" class="green circle"></div></td>
                  <td><div aria-label="no">${close}</div></td>
                  <td><div aria-label="yes">${trues}</div></td>
                </tr>
                <tr>
                  <td scope="row"><div aria-label="yellow" class="yellow circle"></div></td>
                  <td><div aria-label="yes">${trues}</div></td>
                  <td><div aria-label="no">${close}</div></td>
                </tr>
                <tr>
                  <td scope="row"><div aria-label="red" class="red circle"></div></td>
                  <td><div aria-label="yes">${trues}</div></td>
                  <td><div aria-label="yes">${trues}</div></td>
                </tr>
                <tr>
                  <td scope="row"><div aria-label="gray" class="default circle"></div></td>
                  <td>
                    No Data
                    <p class="note">(please contribute)</p>
                  </td>
                  <td>
                    No Data
                    <p class="note">(please contribute)</p>
                  </td>
                </tr>
              </table>
            `}
          />

          <${Expandable}
            toggle=${'Sources'}
            detail=${html`
              <p>
                <b>Project Lockdown</b> uses a variety of sources to compile all the information showcased. We make sure to only consider sources that are reliable and verifiable.
                You can check all the <a rel="noopener noreferrer" target="_blank" href="https://www.TIOF.Click/LockdownData">sources</a> employed here: 
                <ul class="ld-sources">
                  <li>
                    <a rel="noopener noreferrer" target="_blank" href="https://api.coronatracker.com/">Coronatracker API</a><br/>
                    Recognized by <a rel="noopener noreferrer" target="_blank" href="https://www.who.int/bulletin/online_first/COVID-19/en/">WHO</a>
                  </li>
                  <li>
                    For reference data see the <b>Data Sources</b> Tab.
                  </li>
                  <li>
                    For country data see the <b>Find the Countries</b> Tab by it's ISO Alpha 3 code.
                    (Quick find through Global Tab)
                  </li>
                </ul>
                If you find any errors, please help us and report it <a rel="noopener noreferrer" target="_blank" href="https://github.com/Code-for-All/lockdown/issues">by creating an issue here</a>.
              </p>
            `}
          />

          <${Expandable}
            toggle=${'Credits'}
            detail=${html`
              <p>
                <b>Project Lockdown</b> is a Civic Tech initiative from a number of organizations and individuals. You can find the
                <a rel="noopener noreferrer" target="_blank" href="https://www.TIOF.Click/LockdownData">list of project members</a> here
                under the <b>Credits</b> tab.
              </p>
            `}
          />

          <${Expandable}
            toggle=${'Data & Privacy'}
            detail=${html`
              <p>
                We do not collect any information from our visitors.
              </p>
              <p>
                All information from any project member shown anywhere in the application is under their prior consent.
              </p>
            `}
          />
        `,
      };
    case 'settings':
      return {
        title: 'settings',
        template: html` <${Settings} /> `,
      };
    case 'contribute':
      return {
        title: 'contribute',
        template: html`
        <p>
          <b>Project Lockdown</b> is made possible by the contribution of many individuals who are giving their time to make possible that everyone has access to the right information.
        </p>
        <p>
          Do you have any information you want to contribute? Please follow this link:
        </p>
        <a class="ld-link" target="_blank" rel="noopener noreferrer" href="https://docs.google.com/forms/d/e/1FAIpQLSfDWe2qlzUnd3e-YYspMzT9adUswDEYIdJMb7jz7ule34-yiA/viewform">
          Submit data
        </a>
        <p>
          Additionally, you can become part of the project by joining one of the following teams: 
          <ul>
            <li>Editors</li>
            <li>Devs</li>
            <li>UI/UX</li>
          </ul>
        </p>
        <p>
          Contact us via Telegram at:
          <br/>
          <a class="ld-link">@ProjectLockdown</a>
        </p>
        `,
      };

    case 'updates':
      return {
        title: 'updates',
        template: html` <${Ticker} /> `,
      };

    default:
      return {
        title: '',
        template: html``,
      };
  }
};

export class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: 'info',
      showLateralMenu: false,
      showMenu: false
    };

    this.switchContent = this.switchContent.bind(this);
  }

  componentDidMount() {
    let i = 0;

    installMediaQueryWatcher(`(min-width: 960px)`, (matches) => {
      this.setState({
        isMobile: !matches,
      });
      if (matches && i > 0) {
        // This is super ugly, but this fires on pageload and causes the focus to be set on the menu :/
        i++;
        this.props.close();
      }
    });
  }
  showSideBar = () => {
    this.setState({
      showLateralMenu: true,
      showMenu: true
    })
  }
  switchContent(val) {
    if (val === 'settings' && this.state.updateAvailable) {
      this.setState({
        updateAvailable: false,
      });
    }

    if (this.state.isMobile && this.props.opened && val === this.prevVal) {
      this.props.close();
      this.setState({
        activeItem: this.prevVal,
      });
      this.prevVal = '';
      return;
    }
    if(val === this.state.activeItem){

    }else{

      this.props.changeRoute(renderMenu(val));
    }
    this.prevVal = val;
    this.setState({
      activeItem: val,
      showLateralMenu: val === this.state.activeItem?false: true
    });
  }

  render(_, { activeItem, updateAvailable }) {
    return html`
      ${this.state.showLateralMenu ? html` <main id="main" class="ld-menu ${styles2} ${this.state.showLateralMenu ? preStyles : ''}">
        <div class="ld-menu-nav">
          <nav>
            <${Tabs} switchContent=${this.switchContent}>
              <button id="info">info</button>
              <button id="settings">settings</button>
              <button id="updates">updates</button>
              <button id="contribute">contribute</button>
            <//>
          </nav>
        </div>

        <div class="ld-menu--content">
          <div class="mb-only">
            <div class="ld-menu--header">
              <h1>${activeItem}</h1>
            </div>
          </div>
          ${renderMenu(activeItem).template}
        </div>
      </main>` :
      html`<button onClick=${this.showSideBar} class="${sideBtn}">
        ${burger}
      </button>`}
    `;
  }
}
