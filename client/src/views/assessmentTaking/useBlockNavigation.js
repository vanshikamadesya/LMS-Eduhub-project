import { useEffect } from 'react'
import { useNavigate, UNSAFE_NavigationContext } from 'react-router-dom'
import { useContext } from 'react'

// Optional: For blocking internal route navigation
function useBlocker(blocker, when = true) {
    const navigator = useContext(UNSAFE_NavigationContext).navigator

    useEffect(() => {
        if (!when) return

        const unblock = navigator.block((tx) => {
            const autoUnblockingTx = {
                ...tx,
                retry() {
                    unblock()
                    tx.retry()
                }
            }

            blocker(autoUnblockingTx)
        })

        return unblock
    }, [navigator, blocker, when])
}

function useBlockNavigation(when = true, message = 'Are you sure you want to leave this page?') {
    // Warn when refreshing or closing the tab
    useEffect(() => {
        const handleBeforeUnload = (e) => {
            if (!when) return
            e.preventDefault()
            e.returnValue = message
            return message
        }

        if (when) {
            window.addEventListener('beforeunload', handleBeforeUnload)
        }

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload)
        }
    }, [when, message])

    // Optional: Block React Router navigation
    useBlocker((tx) => {
        if (window.confirm(message)) {
            tx.retry()
        }
    }, when)
}

export default useBlockNavigation
