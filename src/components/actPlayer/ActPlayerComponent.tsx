// - Import react components
import React, { Component } from 'react'
import { Chip, Avatar } from '@material-ui/core'
import { IActPlayerComponentProps } from './IActPlayerComponentProps'
// import { IActPlayerComponentState } from './IActPlayerComponentState'
  
const styles = (theme: any) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    // backgroundColor: theme.palette.background.paper
  },
})

/**
 * Create component class
 */
class ActPlayerComponent extends Component<IActPlayerComponentProps> {
        
  /**
   * Reneder component DOM
   * @return {react element} return the DOM which rendered by component
   */
  render () {
    const { tip, dismiss, appear, teamColor } = this.props
    
    return (
             
        <div ref={this.props.incomeRef}>
          <Chip
            id={tip.id}
            avatar={<Avatar>{tip.playerNumber}</Avatar>}
            onClick={appear}
            onDelete={dismiss}
            label={tip.fullName}
            // variant='outlined'      
            color={teamColor}
            // size='medium'
          />           

        </div>
                  
    )
  }
}
 
// const AnimatedPlayer = React.forwardRef((props, ref) => (
//   <ActPlayerComponent incomeRef={ref} {...props} />
// ))

// export {AnimatedPlayer}

export default ActPlayerComponent