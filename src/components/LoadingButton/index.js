import React, { Component } from 'react'
import { Button, CircularProgress } from 'material-ui'

class LoadingButton extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { onClick, loading } = props
    return (
      <Button
        variant="contained"
        onClick={onClick}
        disabled={loading}
        color="primary"
      >
        {loading && <CircularProgress size={18} />}
        {!loading && '登陆'}
      </Button>
    )
  }
}

export default LoadingButton
