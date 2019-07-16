// - Import react components
import React, { Component } from 'react'
import { IActPlayerComponentProps } from './IActPlayerComponentProps'
// import { IActPlayerComponentState } from './IActPlayerComponentState'
  
/**
 * Create component class
 */
class ActPlayerComponent extends Component<IActPlayerComponentProps> {
            
  /**
   * Reneder component DOM
   * @return {react element} return the DOM which rendered by component
   */
  render () {
    const { player, dismiss, appear, teamColor } = this.props
    
    return (
             
        <div ref={this.props.incomeRef}>
          {/* <Chip
            id={tip.id}
            avatar={<Avatar>{tip.playerNumber}</Avatar>}
            onClick={appear}
            onDelete={dismiss}
            label={tip.fullName}
            // variant='outlined'      
            color={teamColor}
            // size='medium'
          />            */}
          <div id={player.id} className='chip' style={{backgroundColor: teamColor}}>
            <img src='https://s3.amazonaws.com/uifaces/faces/twitter/rogie/48.jpg' />
            <span className='chip-number'>{player.playerNumber}</span>
              <span className='chip-name' onClick={appear}>{player.fullName}</span>
              <span className='chip-button-close' role='button' onClick={dismiss}>x</span>
          </div>

        </div>
                  
    )
  }
}
 
// const AnimatedPlayer = React.forwardRef((props, ref) => (
//   <ActPlayerComponent incomeRef={ref} {...props} />
// ))

// export {AnimatedPlayer}

export default ActPlayerComponent