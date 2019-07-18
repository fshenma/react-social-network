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
    const { player, moveUp, moveDown, dismiss, appear, teamColor } = this.props
    
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
            <img src='https://www.flaticon.com/premium-icon/icons/svg/1977/1977966.svg' />
            <span className='chip-number'>{player.playerNumber}</span>
              <span className='chip-name' onClick={appear}>{player.fullName}</span>
              <span className='chip-button-close' role='button' onClick={moveUp}>&#8657;</span>
              <span className='chip-button-close' role='button' onClick={moveDown}>&#8659;</span>
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