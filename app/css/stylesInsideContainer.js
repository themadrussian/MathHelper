module.exports = {
  container: {
     flex: 1,
  },
  darkenBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    // top: 34,
    // marginTop: (Platform.OS == 'ios') ? 44 : 0,
  },
  modal: {
    flex: 1,
    alignContent: "center",
    borderWidth: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalHeader: {
    fontSize: 25,
    fontWeight: 'bold',
    color: "green",
  },
  rewardBody: {
    fontSize: 20,
    fontWeight: 'bold',
    color: "darkblue",
    padding: 20,
    textAlign: 'center',
    borderColor: "darkblue",
    borderRadius: 5,
  },
  smallPrint: {
    fontSize: 12,
    fontWeight: 'normal',
    color: "lightgrey",
    textAlign: 'center'
  },
  settingsModal: {
    justifyContent: 'flex-start',
    margin: 22
  }
}
